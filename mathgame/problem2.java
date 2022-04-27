/**
 * 문제 2
 *
 * 원주가 50.24cm, 지름의 길이가 16cm일 때 원주율을 구하는 코드를 작성하세요.
 *
 * 출력 예시
 * 3.14cm
 **/
public class problem2 {
    public static void main(String[] args) {
        double 원주 = 50.24;  // 원주
        double 지름 = 16;// 지름

        System.out.println(원주/지름+"cm");
    }
}
/**
 * 도우미 설명
 * 원의 둘레를 원둘레 또는 원주라고 합니다.
 * 원의 크기와 관계없이 원주와 지름의 비는 일정하고, 이 비의 값을 원주율이라고 합니다.
 * (원주율) = (원주)/(지름)
 *
 * 한글 코드 모범 답안
 * 소수 circumference = 7.0;
 * 소수 diameter = 9.0;
 * 출력(circumference/diameter+"m");
 **/


