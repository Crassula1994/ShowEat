package com.ssafy.showeat.domain.user.service.implement;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.showeat.domain.S3.dto.S3FileDto;
import com.ssafy.showeat.domain.user.dto.request.UpdateAddressRequestDto;
import com.ssafy.showeat.domain.user.dto.request.UpdateNicknameRequestDto;
import com.ssafy.showeat.domain.user.dto.response.UserResponseDto;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private static final String DEFAULT_IMAGE = "기본이미지 주소";

    private String bucketName = "showeat/user";
    private final AmazonS3Client amazonS3Client;
    private final UserRepository userRepository;
    @Override
    public UserResponseDto getUserById(Long userId) {
        log.info("UserServiceImpl_getUserById -> 사용자 정보 조회 시도");
        //사용자 정보 조회
        User user = userRepository.findByUserId(userId)
                .orElseThrow(RuntimeException::new);
        return new UserResponseDto(user.getUserId(),user.getUserNickname(),
                user.getUserImgUrl(),user.getUserAddress(),user.getUserMoney());
    }

    @Override
    @Transactional
    public void updateNickname(UpdateNicknameRequestDto updateNicknameRequestDto) {
        log.info("UserServiceImpl_updateNickname -> 사용자 닉네임 수정 시도");
        User user = userRepository.findByUserId(updateNicknameRequestDto.getUserId()).orElseThrow(RuntimeException::new);
        user.updateuserNickname(updateNicknameRequestDto.getUserNickname());

    }

    @Override
    @Transactional
    public List<S3FileDto> updateuserImgUrl(List<MultipartFile> multipartFiles,Long userId) {
        log.info("UserServiceImpl_updateImage -> 사용자 프로필 사진 수정 시도");
        List<S3FileDto> s3files = new ArrayList<>();
        String originalFileName = multipartFiles.get(0).getOriginalFilename();
        String uploadFileName = getUuidFileName(originalFileName);
        String uploadFileUrl = "";

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFiles.get(0).getSize());
        objectMetadata.setContentType(multipartFiles.get(0).getContentType());

        try (InputStream inputStream = multipartFiles.get(0).getInputStream()) {

            String keyName = uploadFileName; // ex) 구분/년/월/일/파일.확장자

            // S3에 폴더 및 파일 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata));

            // S3에 업로드한 폴더 및 파일 URL
            uploadFileUrl = amazonS3Client.getUrl(bucketName, keyName).toString();
            User user = userRepository.findByUserId(userId).orElseThrow(RuntimeException::new);
            user.updateuserImgUrl(uploadFileUrl);
        } catch (IOException e) {
            log.error("UserServiceImpl_updateImage -> 사용자 이미지 변경 실패: {}", e.getMessage());
            e.printStackTrace();
        }

        s3files.add(
                S3FileDto.builder()
                        .originalFileName(originalFileName)
                        .uploadFileName(uploadFileName)
                        .uploadFileUrl(uploadFileUrl)
                        .build());
        return s3files;
    }

    public String getUuidFileName(String fileName) {
        String name = fileName.substring(fileName.indexOf(".") + 1);
        return UUID.randomUUID().toString() + "." + name;
    }

    @Override
    @Transactional
    public void updateAddress(UpdateAddressRequestDto updateAddressRequestDto) {
        log.info("UserServiceImpl_updateAddress -> 사용자 관심 지역 수정 시도");
        User user = userRepository.findByUserId(updateAddressRequestDto.getUserId()).orElseThrow(RuntimeException::new);
        user.updateAddress(updateAddressRequestDto.getUserAddress());
    }
}
