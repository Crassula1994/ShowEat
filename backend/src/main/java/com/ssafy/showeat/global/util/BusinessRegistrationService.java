package com.ssafy.showeat.global.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.showeat.domain.business.dto.request.BusinessInfoRequestDto;
import com.ssafy.showeat.global.exception.BusinessRegistrationException;

@Service
public class BusinessRegistrationService {

	@Value("${business.url}")
	private String apiURL;

	@Value("${business.secretKey}")
	private String secretKey;

	public boolean verifyBusinessRegistration(BusinessInfoRequestDto businessRegistration) {
		String validValue = "02";
		try {
			URL apiUrl = new URL(apiURL + secretKey);
			HttpURLConnection connection = (HttpURLConnection)apiUrl.openConnection();
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
			connection.setDoOutput(true);

			Map<String, Object> data = new HashMap<>();
			Map<String, String> business = new HashMap<>();
			business.put("b_no", businessRegistration.getBusinessNumber());
			business.put("start_dt", businessRegistration.getStartDate());
			business.put("p_nm", businessRegistration.getBusinessCeo());
			business.put("p_nm2", "");
			business.put("b_nm", businessRegistration.getBusinessName());
			business.put("corp_no", "");
			business.put("b_sector", "");
			business.put("b_type", "");

			data.put("businesses", new Map[] {business});

			String jsonInputString = new ObjectMapper().writeValueAsString(data);

			try (OutputStream os = connection.getOutputStream()) {
				byte[] input = jsonInputString.getBytes("UTF-8");
				os.write(input, 0, input.length);
			}

			int responseCode = connection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
				String inputLine;
				StringBuilder response = new StringBuilder();

				while ((inputLine = in.readLine()) != null) {
					response.append(inputLine);
				}
				in.close();

				String jsonResponse = response.toString();

				// JSON 파싱
				ObjectMapper objectMapper = new ObjectMapper();
				Map<String, Object> responseData = objectMapper.readValue(jsonResponse, Map.class);

				// "data" 배열에서 "valid" 값 추출
				Map<String, Object> dataItem = ((List<Map<String, Object>>)responseData.get("data")).get(0);
				validValue = (String)dataItem.get("valid");
			}
			return validValue.equals("01");
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessRegistrationException();
		}
	}

}
