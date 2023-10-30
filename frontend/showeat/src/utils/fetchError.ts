/* Function for Handling Error */
function handleFetchError(statusCode: number) {
    switch (statusCode) {
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
        case 460:
            return "해당 업체가 존재하지 않습니다.";
        case 470:
            return "해당 쿠폰이 존재하지 않습니다.";
        case 480:
            return "펀딩을 찾을 수 없습니다.";
        case 481:
            return "이미 종료된 펀딩입니다.";
        case 482:
            return "펀딩 참여 가능한 자리가 없습니다.";
        case 483:
            return "펀딩 중복 참여는 불가능합니다.";
        case 484:
            return "펀딩에 참여할 유저의 포인트가 부족합니다.";
        case 485:
            return "참여하지 않은 펀딩은 취소할 수 없습니다.";
        case 500:
            return "서버에서 예측하지 못한 에러가 발생했습니다.";
        default:
            return "알 수 없는 에러가 발생했습니다.";
    }
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default handleFetchError;
