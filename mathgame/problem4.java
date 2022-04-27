/**
 * 문제 4
 *
 * 반지름이 9인 원의 넓이를 구하는 코드를 작성하세요.
 * (원주율 값은 3.14로 계산합니다)
 *
 * 출력 예시
 * 254.34cm^2
 **/
public class problem4 {
    public static void main(String[] args) {
        double 원의넓이 = 3.14 * 9 * 9;
        System.out.println(원의넓이+"cm^2");
    }
}
/**
 * 도우미 설명
 * 원주의 길이는 원주율*반지름길이*반지름길이로 구할 수 있습니다.
 *
 * 한글 코드 모범 답안
 * 소수 원의넓이 = 3.14*9*9;
 * 출력(원의넓이 + "cm^2");
 **/
