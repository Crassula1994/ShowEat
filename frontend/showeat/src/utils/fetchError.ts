/* Function for Handling Error */
function handleFetchError(statusCode: number) {
    switch (statusCode) {
        case 400:
            return "요청이 실패했습니다.";
        case 401:
            // Unauthorized
            return 401;
        case 410:
            return 410;
        case 411:
            return 411;
        case 412:
            return 412;
        case 413:
            return 413;
        case 430:
            return "유효하지 않은 토큰입니다.";
        case 431:
            return "만료된 토큰입니다.";
        case 432:
            return "접근 권한이 없습니다.";
        case 433:
            return "잘못된 토큰입니다.";
        case 440:
            return "사용된 쿠폰에 한해서 리뷰가 작성 가능합니다.";
        case 450:
            return "사용자를 찾을 수 없습니다.";
        case 451:
            return 451;
        case 452:
            return 452;
        case 460:
            return "해당 업체가 존재하지 않습니다.";
        case 463:
            return 463;
        case 470:
            return "해당 쿠폰이 존재하지 않습니다.";
        case 480:
            return "펀딩을 찾을 수 없습니다.";
        case 481:
            return 481;
        case 482:
            return 482;
        case 483:
            return 483;
        case 484:
            return 484;
        case 485:
            return 485;
        case 486:
            return "해당 페이지는 데이터가 없기에 조회할 수 없습니다.";
        case 500:
            return "서버에서 예측하지 못한 에러가 발생했습니다.";
        default:
            return 520;
    }
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default handleFetchError;
