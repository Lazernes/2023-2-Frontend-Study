# 8장
함수 정의하기
======

함수를 정의하는 방법
------
함수를 정의하는 방법은 네가지이다.<br/>
**① 함수 선언문으로 정의하는 방법**
```javascript
function square(x) { return x*x; }
```
**② 함수 리터럴로 정의하는 방법**
```javascript
var square = function(x) { return x*x; }
```
**③ Function 생성자로 정의하는 방법**
```javascript
var square = new Function("x","return x*x");
```
**④ 화살표 함수 표현식으로 정의하는 방법**
```javascript
var square = x => x*x;
```

중첩 함수
------
특정 함수의 내부에 선언된 함수를 가리켜 그 함수의 중첩 함수라고 한다. 함수 안의 if 문과 while 문 등의 문장 블록 안에는 중첩 함수를 작성할 수 없다. 다음 예제의 함수 norm(x)는 배열 x 안에 들어 있는 배열 요소의 제곱합에 대한 제곱근을 구한다.
```javascript
function norm(x){
  var sum2 = sumSquare();
  return Math.sqrt(sum2);
  function sumSquare(){
    sum = 0;
    for(var i = 0; i<x.length; i++) sum += x[i]*x[i];
    return sum;
  }
  var a = [2,1,3,5,7];
  var n = norm(a);
  console.log(n); // 9.38083151964686
}
```
<p align="center"><img src="/Week2/img/Modern_Javascript_8_1_1.jpg" width="400" height="300"></p><br/>
중첩 함수의 참조는 그 중첩 함수를 둘러싼 외부 함수의 지역 변수에 저장되므로 외부 함수의 바깥에서는 읽거나 쓸 수 없다. 또한 중첩 함수는 자신을 둘러싼 외부 함수의 인수와 지역 변수에 접근할 수 있다. 위 예제에서 중첩 함수 sumSquare는 변수 x를 사용하지만 변수 x는 외부 함수인 norm의 인수이다.

함수 호출하기
======

함수를 호출하는 방법
------
함수를 호출하는 방법은 네가지이다.<br/>
**① 함수 호출**<br/>
함수의 참조가 저장된 변수 뒤에 그룹 연산자인 ()를 붙여서 함수를 호출한다.
```javascript
var s = square(5);
```
**② 메서드 호출**<br/>
객체의 프로퍼티에 저장된 값이 함수 타입일 때는 그 프로퍼티를 메서드라고 부른다. 메서드를 호출할 때는 그룹 연산자인 ()를 붙여서 호출한다. 이는 **함수 호출**과 본질적으로 같은 방법이다.
```javascript
obj.m = function() {...};
obj.m();
```
**③ 생성자 호출**<br/>
함수 또는 메서드를 호출할 때 함수의 참조를 저장한 변수 앞에 new 키워드를 추가하면 함수가 생성자로 동작한다.
```javascript
var obj = new Object();
```
**④ call, apply를 사용한 간접 호출**<br/>
함수의 call과 apply 메서드를 사용하면 함수를 간접적으로 호출할 수 있다.

즉시 실행 함수
------
일반적으로 익명 함수를 실행할 때는 익명 함수의 참조를 변수에 할당한 후에 그룹 연산자인 ()를 붙여서 실행한다.
```javascript
var f = function() {...};
f();
```
자바스크립트에는 익명 함수를 정의하고 곧바로 실행하는 '즉시 실행 함수'라는 구문이 있다.
```javascript
(function() {...})();
(function() {...}());
```
이렇게 수정하면 익명 함수를 정의하는 동시에 실행할 수 있다.
```javascript
(function fact(n){
    if( n<=1 ) return 1;
    return n*fact(n-1);
})(5);    // 120
```

함수의 인수
======
자바스크립트에서 함수를 호출할 때 인수를 생략할 수 있다. 반대로 함수 정의식에 작성된 인자 개수보다 더 많은 개수의 인수를 넘겨서 실행할 수 있다.

인수의 생략
------
함수 정의식에 작성된 인자 개수보다 인수를 적게 전달해서 실행하면 생략한 인자는 undefined가 된다.
```javascript
function f(x, y) {
    console.log("x = " + x + ", y = " + y);
}
f(2); // x = 2, y = undefined
```
이러한 성질을 활용하면 호출할 때 인수를 생략할 수 있는 함수를 정의할 수 있다. 이룰 구현하려면 함수 정의식에서 인수를 생략했을 때 사용할 초깃값을 성정해야 한다.
```javascript
function multiply(a, b){
    b = b || 1;   // b의 초깃값을 1로 설정
    // 논리합 연산자인 ||는 왼쪽 피연산자가 true로 평가되면 왼쪽 피연산자를 반환한다.
    // 반대로 왼쪽 피연산자가 false로 평가되면 오른쪽 피연산자를 반환한다.
    return a*b;
}
multiply(2,3);    // 6
multiply(2);      // 2
```

가변 길이 인수 목록(Arguments 객체)
------
모든 함수에서 사용할 수 있는 지역 변수로는 arguments 변수가 있다. arguments 변수의 값은 Arguments 객체이다. 함수에 인수를 n개 넘겨서 호출하면 인수 값이 다음과 같이 arguments에 저장된다.
```javascript
arguments[0] : 첫번쨰 인수 값
arguments[1] : 두번쨰 인수 값
  ...
arguments[n-1] : n번쨰 인수 값
```
Arguments 객체는 프로퍼티로 length와 callee를 갖고 있으며 각 프로퍼티에는 다음과 같은 값이 담겨있다.
```javascript
argument.length : 인수 개수
arguments.callee : 현재 실행되고 있는 함수의 참조
```
Arguments 객체는 '유사 배열 객체'이다.<br/>
arguments[i] 값을 바꾸면 i + 1번째 인자가 있을 때 그 값이 함꼐 바뀐다.
```javascript
function f(x, y){
    arguments[1] = 3;
    console.log("x = " + x + ", y = " + y);
}
f(1, 2);  // x = 1, y = 3
```
위 코드에서 arguments[1] 값을 바꾸면 함수 인자 y의 값이 함께 바뀐다. 다음 myConcat 함수는 첫 번째 인수로 받은 separator 로 두 번째 이후의 모든 인수를 연결한 문자열 하나를 반환한다.
```javascript
function myConcat(separator) {
    var s = "";
    for(var i=1; i<arguments.length; i++){
      s += arguments[i];
      if( i < arguments.length-1 ) s += separator;
    }
    return s;
}
console.log(myConcat("/","apple","orange","peach"));  // apple/orange/peach
```
다음과 같은 방법을 사용하면 배열 객체로 변환할 수 있다.
```javascript
var params = [].slice.call(arguments);
```

재귀 함수
======
함수가 자기 자신을 호출하는 행위를 가리켜 **재귀 호출**(recursive call)이라고 한다. 이러한 재귀 호출을 수행하는 함수를 **재귀 함수**라고 한다.

재귀 함수의 기본
------
다음 예제는 함수 fact(n)은 n의 팩토리얼을 반환한다.
```javascript
function fact(n) {
    if( n <= 1 ) return 1;
    return n*fact(n-1);
}
fact(5);  // 120
```
위 예제를 함수 fact를 함수 리터럴로 정의하려면 다음과 같이 함수 리터럴 표현식에 함수 이름을 적는다. 단, 함수 이름 f는 함수 안에서만 유효하다.
```javascript
var fact = function f(x) {
    if( n <= 1 ) return 1;
    return n*f(n-1);
}
```
arguments.callee를 사용하면 이름이 없는 익명 함수도 재귀 호출을 할 수 있다. arguments.callee가 지금 실행 중인 함수를 가리키기 때문이다.
```javascript
var fact = function(n) {
  if( n <= 1 ) return 1;
  return n*arguments.callee(n-1);
}
```
재귀함수를 정의할 때는 다음 두가지 사항에 유의해야 한다.<br/>
**① 재귀 호출은 반드시 멈춰야 한다**<br/>
함수가 자신을 호출하면 무한한 연쇄 호출로 이어지므로 프로그램이 멈추지 않을 가능성이 있다. 따라서 재귀 호출이 중간에 멈출 수 있도록 만들어야 한다.<br/> 
**② 재귀 호출로 문제를 간단하게 해결할 수 있을 떄만 사용한다**<br/>
재귀 함수는 재귀 호출이 멈출 때까지 몇 번이고 자기 자신을 호출하는 함수이다. 호출된 각각의 재귀 함수는 메모리의 다른 영역을 사용한다. 따라서 호출된 횟수만큼 메모리 소비량이 늘어난다. 반복문을 재귀 함수로 바꾸어 표현할 수는 있지만 대부분은 while 문이나 for 문으로 작성하는 편이 이해하기 쉽고 메모리 공간도 적게 차지한다.

프로그램의 평가와 실행 과정
======
이 절에서는 자바스크립트의 내부 구조를 설명한다.

실행 가능한 코드
------
자바스크립트 엔진은 **실행 가능한 코드**(Executable Code)를 만나면 그 코드를 평가(Evaluation)해서 실행 문맥(Execution Context)으로 만든다. 이 실행 가능한 코드(Executable Code)의 유형은 다음과 같다.<br/>
　• 전역 코드<br/>
　• 함수 코드<br/>
　• eval 코드<br/>
전역 코드는 전역 객체 Window 아래에 정의된 함수를 말하고, 함수 코드는 문자 그대로 함수를 말하며, eval 코드는 eval 함수를 말한다.

실행 문맥의 구성
------
실행 문맥(Execution Context)은 실행 가능한 코드가 실제로 실행되고 관리되는 영역으로 실행에 필요한 모든 정보를 컴포넌트 여러 개가 나누어 관리하도록 만들어져 있다. 그중에서 가장 중요한 컴포넌트는 **렉시컬 환경**(LexicalEnvironment) **컴포넌트**, **변수 환경**(VariableEnvironmnt) **컴포넌트**, **디스 바인딩**(This Binding) **컴포넌트**이다. 다음 코드는 자바스크립트의 객체 표현을 빌려 실행 문맥을 표현한 것이다.
```
ExecutuonContext = {
    // 렉시컬 환경 컴포넌트
    LexicalEnvironment: {},
    // 변수 환경 컴포넌트
    VariableEnvironment: {},
    // 디스 바인딩 컴포넌트
    ThisBinding: null,
}
```
**렉시컬 환경 컴포넌트와 변수 환경 컴포넌트**<br/>
렉시컬 환경(LexicalEnvironment) 컴포넌트와 변수 환경(VariableEnvironment) 컴포넌트는 앞으로 설명할 렉시컬 환경(LexicalEnvironment) 타입의 컴포넌트이다. 랙시컬 환경 컴포넌트와 변수 환경 컴포넌트는 타입이 같고 실제로 with 문을 사용할 때를 제외하면 내부 값이 같으므로 똑같이 취급해도 무리가 없다.<br/>
**디스 바인딩 컴포넌트**<br/>
디스 바인딩(This Binding) 컴포넌트는 그 함수를 호출한 객체의 참조가 전달되는 곳이다. 이것이 가리키는 값이 곧 해당 실행 문맥의 this가 된다.

렉시컬 환경 컴포넌트의 구성
------
실행 문맥의 구성 요소인 렉시컬 환경 컴포넌트는 자바스크립트 엔진이 자바스크립트 코드를 실행하기 위해 자원을 모아 둔 곳으로 구체적으로는 함수 또는 블록의 유효 범위 안에 있는 식별자와 그 결괏값이 저장되는 곳이다. 자바스크립트 엔진은 해당 자바스크립트 코드의 유효 범위 안에 있는 식별자와 그 식별자가 가리키는 값을 키와 값의 쌍으로 바인드해서 렉시컬 환경 컴포넌트에 기록한다. 렉시컬 환경 컴포넌트는 **환경 레코드**(Environment Recoed)와 **외부 렉시컬 환경 참조**(Outer Lexical Environment Reference) 컴포넌트로 구성되어 있다. 다음 코드는 자바스크립트의 객체 표현을 빌린 의사 코드로 렉시컬 환경 컴포넌트를 표현한 것이다.
```
LexicalEnvironment: {
    // 환경 레코드
    EnvironmentRecord: {},
    // 외부 렉시컬 환경 참조
    OuterLexicalEnvironment Reference: {}
}
```
**환경 레코드**<br/>
환경 레코드는 유효 범위 안에 포함된 식별자를 기록하고 실행하는 영역으로 ECMAScript 3의 변수 객체(Variable Object)와 매우 비슷한 역할을 한다. 자바스크립트 엔진은 유효 범위 안의 식별자와 결괏값을 바인드해서 환경 레코드에 기록한다.<br/>
**외부 렉시컬 환경 참조**<br/>
자바스크립트는 함수 안에 함수를 중첩해서 정의할 수 있는 언어이므로 자바스크립트 엔진은 유효 범위 너머의 유효 범위도 검색할 수 있어야 한다. 외부 렉시컬 환경 참조에는 함수를 둘러싸고 있는 코드가 속한 렉시컬 환경 컴포넌트의 참조가 저장된다. 중첩된 함수 안에서 바깥 코드에 정의된 변수를 읽거나 써야 할 때, 자바스크립트 엔진은 외부 렉시컬 환경 참조를 따라 한 단계씩 렉시컬 환경을 거슬러 올라가서 그 변수를 검색한다.

환경 레코드의 구성
------
렉시컬 환경 컴포넌트의 구성 요소인 **환경 레코드**는 렉시컬 환경 안의 식별자와 그 식별자가 가리키는 값의 묶음이 실제로 저장되는 영역이다. 이 환경 레코드는 **선언적 환경 레코드**(Declarative Environment Record)와 **객체 환경 레코드**(Object Environment Record)로 구성되어 있으며 저장하는 값의 유형에 따라 쓰임새가 달라진다. 다음 코드는 자바스크립트의 객체 표현을 빌린 의사 코드로 환경 레코드를 표현한 것이다.
```
EnvironmentRecoed: {
    // 선언적 환경 레코드
    DeclarativeEnvironmentRecord: {},
    // 객체 환경 레코드
    ObjectEnvironmentRecord: {}
}
```
**선언적 환경 레코드**<br/>
**선언적 환경 레코드**는 실제로 함수와 변수, catch 문의 식별자와 실행 결과가 저장되는 영역이다.<br/>
**객체 환경 레코드**<br/>
선언적 환경 레코드가 식별자와 그 실행 결과를 키와 값의 쌍으로 관리하는 반면 **객체 환경 레코드**는 실행 문맥 외부에 별도로 저장된 객체의 참조에서 데이터를 읽거나 쓴다.

전역 환경과 전역 객체의 생성
------
자바스크립트 인터프리터는 시작하자마자 렉시컬 환경 타입의 전역 환경(Global Environment)을 생성한다. 웹 브라우저에 내장된 자바스크립트 인터프리터는 새로운 웹 페이지를 읽어 들인 후에 전역 환경을 생성하고 전역 객체를 생성한 다음 전역 환경의 객체 환경 레코드에 전역 객체의 참조를 대입한다. 전역 객체에는 다음과 같은 프로퍼티가 있다.

|분류|프로퍼티|
|:---:|---|
|전역 프로퍼티|undefined, NaN, Infinity|
|생성자|Object(),String(), Number() 등|
|전역 함수|parseInt(), parseFloat(), isNaN() 등|
|내장 객체|Math, JSON, Reflect|

최상위 레벨(함수 바깥에 있는 코드)의 this는 전역 객체를 가리킨다.
```
this === window
```

이 코드의 상태를 의사 코드로 표현하면 다음과 같다.
```
// 전역 환경
GlobalEnvironment = {
    ObjectEnvironmentRecord: {
        bindObject: window
    },
    OuterLexicalEnvironmentReference: null
}

// 전역 실행 문맥
ExecutionContext = {
    LexicalEnvironment: GlobalEnvironment,
    ThisBinding: window,
}
```

프로그램의 평가와 전역 변수
------
전역 환경과 전역 객체를 생성한 후에는 자바스크립트 프로그램을 읽어 들인다. 자바스크립트 프로그램을 다 읽어 들인 후에는 프로그램을 평가하며, 최상위 레벨에 var 문으로 작성한 전역 변수는 전역 환경의 환경 레코드(객체 환경 레코드)의 프로퍼티로 추가된다.
```
GlobalEnvironment = {
    // 전역 환경의 환경 레코드인 객체 환경 레코드에 Window의 참조가 설정되어 있음
    ObjectEnvironmentRecord: {
        bindObject: window
    },
    OuterLexicalEnvironmentReference: null
}
```

프로그램 실행과 실행 문맥
------
프로그램이 평가된 다음에는 프로그램이 실행되며, 프로그램은 **실행 문맥**(Execution Context) 안에서 실행된다. 실행 문맥은 **스택** 구조로 관리된다.<br/>
실행 문맥은 프로그램 실행 중에 스택에 push되어 실행된다. 가장 먼저 실행하는 코드는 전역 코드이며, 이 때문에 스택의 맨 아랫부분에는 항상 전역 코드를 실행하기 위한 실행 문맥이 자리 잡고 있다. 전역 코드 안에서 함수를 실행하면 그 함수를 실행하기 위한 실행 문맥을 스택에 push한다. 그리고 그 함수의 작업을 끝내고 함수를 호출한 부분으로 제어권이 돌아오면 스택에서 pop한다. 이때 실행하는 함수가 특정 함수의 내부에 정의된 중첩 함수라면 중첩 함수의 실행 문맥을 새로 만들어서 스택에 push한다. 함수 안에 있는 코드를 실행하는 도중에 다른 함수를 호출하면 그 함수의 실행 문맥도 스택에 push한다. 이 방식은 중첩 함수를 호출했을 경우와 함수를 재귀적으로 호출한 경우에도 똑같이 적용된다.<br/>
재귀 호출한 함수는 분명 호출한 함수와 같은 함수이지만 전혀 다른 함수로서 스택에 push된다. return 문이 실행되어 제어권이 호출한 코드로 돌아가면 스택에서 pop된다. 이러한 이유로 실행 문맥 스택을 **호출 스택**(call stack)이라는 이름으로 부른다.<br/>
<p align="center"><img src="/Week2/img/Modern_Javascript_8_5_1.jpg" width="700" height="400"></p><br/>

자바스크립트는 싱글 스레드
------
프로그램을 실핸하는 방식에는 **싱글 스레드** 방식과 **멀티스레드** 방식이 있다. 스레드란 프로그램의 처리 흐름이다. 실글 스레드 방식은 프로그램 한 개의 처리흐름으로 프로그램을 순차적으로 실행하는 방식이고 멀티스레드 방식은 프로그램 여러 개의 처리 흐름으로 동시에 작업을 여러 개 병렬로 실행하는 방식이다.<br/>
<p align="center"><img src="/Week2/img/Modern_Javascript_8_5_2.jpg" width="600" height="200"></p><br/>

환경 레코드와 지역 변수
------
함수를 호출하면 현재 실행 중인 코드의 작업을 일시적으로 멈추고 **실행 문맥**영역을 생성하고 프로그램의 실행 흐름이 그 실행 문맥으로 이동한다. 다음으로 그 함수의 실행 문맥이 호출 스택에 push되고 실행 문맥 안에 렉시컬 환경 컴포넌트를 생성한다. 이 렉시컬 환경 컴포넌트는 환경 레코드를 가지고 있으며, 환경 레코드 안에 그 함수 안에서 선언된 중첩 함수의 참조와 변수를 기록한다.<br/>
함수의 실행 문맥, 렉시컬 환경, 환경 레코드가 생성되면 실행 문맥에 있는 **디스 바인딩**(This Binding) 컴포넌트에 그 함수를 호출한 객체의 참조를 저장하며, 이것으로 this 값을 결정한다. 이 this는 동적이며 함수를 호출하는 상황에 따라 가리키는 객체가 바뀐다.

this 값
------
함수가 호출되어 실행되는 시점에 this 값이 결정된다. this 값은 '함수가 호출되었을 때 그 함수가 속해 있던 객체의 참조'이며 실행 문맥의 디스 바인딩 컴포넌트가 참조하는 객체이다.
```javascript
var tom = {
    name: "Tom",
    sayHello: function(){
        console.log("Hello!" + this.name);
    }
}

tom.sayHello(); // Hello! Tom
```

식별자 결정: 유효 범위 체인
------
자바스크립트가 대다수의 언어와 마찬가지로 어휘적 유효 범위를 채용하고 있어 변수를 선언하면 그 안쪽에 있는 코드 전체가 그 변수를 사용할 수 있는 유효 범위가 된다. 중첩 함수와 외부 함수 혹은 전역 코드에서 같은 이름을 가진 변수를 사용하면 충돌이 발생한다. 이때 변수 x가 어디에서 선언된 변수인지 결정하는 작업을 가리켜 변수 x의 **식별자 결정**(Identifier Resolution)이라고 한다. 자바스크립트의 식별자 결정 규칙은 **좀 더 안쪽 코드에 선언된 변수를 사용한다**이다.
```javascript
var a = "A";
function f() {
    var b = "B";
    function g() {
        var c = "C";
        console.log(a+b+c);
    }
    g();
}
f();  //ABC
```
위 코드에서 자바스크립트 엔진은 앞 코드의 함수 g 안의 문장인 console.log(a+b+c)에서 변수 a, b, c의 식별자를 어떨게 찾아내는지 알아보자.<br/>
우선 몇가지 용어를 알아보면, 일반적으로 함수의 인수와 지역 변수를 **속박 변수**라고 하고 그 외의 변수를 **자유 변수**라고 한다. 앞 코드에서는 c가 속박 변수이고 a와 b가 자유 변수이다. 또한 속박 변수만 포한된 함수를 **닫힌 함수**, 자유 변수를 가지고 있는 함수를 **열린 함수**라고 한다. 앞 코드에서는 함수 f가 닫힌 함수고 함수 g가 열린 함수이다.<br/>
이제 실별자 결정의 메커니즘을 알아보자.<br/>
**① 속박 변수 c**<br/>
변수 c는 함수 g안에서 선언된 속박 변수이므로 함수 g의 환경 레코드(선언적 환경 레코드) 안에서 찾을 수 있다.
```
// 함수 g가 속한 렉시컬 환경 컴포넌트
g_LexicalEnvironment: {
    // 선언적 환경 레코드
    DeclarativeEnvironmentRecord: {
        c: "C"
    },
    // 함수 f의 렉시컬 환경 컴포넌트를 참조
    OuterLexicalEnvironmentReference: f_LexicalEnvironment
}
```
**② 자유 변수 b**<br/>
변수 b는 함수 g의 바깥에서 선언된 자유 변수이다. 변수 b는 함수 g가 속한 실행 문맥의 환경 레코드(선언적 환경 레코드) 안에서 찾을 수 없다. 그래서 실행 문맥 속에 있는 외부 렉시컬 환경 참조를 따라 함수 g를 호출한 함수인 f가 속한 실행 문맥의 환경 레코드(선언적 환경 레코드)를 검색한다. 변수 b는 함수 f 안에 선언되어 있으므로 함수 f의 환경 레코드(선언적 환경 레코드) 안에서 찾을 수 있다.<br/>
함수 f가 호출되면 함수 f의 환경 레코드에 변수 b가 프로퍼티로 추가된다. 그 후에 함수 g의 선언문이 평가되어 환경 레코드가 생성된다. 이때 함수 g는 함수 객체가 함수 f의 렉시컬 환경을 참조한다. 이 참조로 함수 g안에 변수 b를 사용할 수 있게 된다. 이러한 과정을 거쳐 함수 g를 실행하는 시점에는 변수 b의 위치를 외부 렉시컬 환경 참조를 따라 검색할 수 있는 상태가 된다.
```
// 함수 g가 속한 실행 렉시컬 환경 컴포넌트
g_LexicalEnvironment: {
    // 선언적 환경 레코드
    DeclarativeEnvironmentRecord: {
        c: "C"
    },
    // 함수 f의 렉시컬 환경 컴포넌트를 참조
    OuterLexicalEnvironmentReference: f_LexicalEnvironment
}

// 함수 f가 속한 실행 렉시컬 환경 컴포넌트
f_LexicalEnvironment: {
    DeclarativeEnvironmentRecord: {
        b: "B"
    },
    OuterLexicalEnvironmentReference: global_LexicalEnvironment
}

```
**③ 자유 변수 a**<br/>
변수 a는 함수 f의 바깥에서 선언된 자유 변수이다. 변수 a는 함수 f가 속한 실행 문맥의 환경 레코드(선언적 환경 레코드) 안에서 찾을 수 없다. 그래서 실행 문맥 속에 있는 외부 렉시컬 환경 참조를 따라 함수 g를 호출한 함수인 f의 환경 레코드(선언적 환경 레코드)를 검색한다. 하지만 이 안에서도 찾을 수 없다. 그러면 외부 렉시컬 환경 참조를 따라 한 단계를 더 거슬러 올라가 함수 f의 전역 실행 문맥 속에 있는 환경 레코드(객체 환경 레코드) 안에서 찾을 수 있다.<br/>
```
// 함수 g가 속한 렉시컬 환경 컴포넌트
g_LexicalEnvironment: {
    // 선언적 환경 레코드
    DeclarativeEnvironmentRecord: {
        c: "C"
    },
    // 함수 f의 렉시컬 환경 컴포넌트를 참조
    OuterLexicalEnvironmentReference: f_LexicalEnvironment
}

// 함수 f가 속한 렉시컬 환경 컴포넌트
f_LexicalEnvironment: {
    DeclarativeEnvironmentRecord: {
        b: "B"
    },
    // 전역 실행 환경의 렉시컬 환경 컴포넌트를 참조
    OuterLexicalEnvironmentReference: global_LexicalEnvironment
}

// 전역 실행 환경(렉시컬 환경 컴포넌트)
global_LexicalEnvironment: {
    DeclarativeEnvironmentRecord: {
        bindObject: {
        a: "A"
        }
    },
    OuterLexicalEnvironmentReference: null
}
```
이처럼 식별자 결정은 현재의 유효 범위 안에 없는 식별자를 찾을 때 바깥쪽 범위로 호출자의 렉시컬 환경에 속한 외부 렉시컬 환경의 참조를 따라 찾아가는 방식을 취한다. 이러한 **논리적인 연결고리**(선언 목록)를 ECMAScript 3 기준에서는 **스코프 체인**이라도 부른다. ECMAScript 5 부터는 스코프 체인이라는 단어가 사라졌으므로 **외부 렉시컬 환경 체인**(Outer Lexical EnvironmentReference Chain)이라는 단어가 적합하지만 ECMAScript 5 스펙에 있는 단어가 아니므로 **유효 범위 체인**이라고 부른다.

가비지 컬렉션
------
프로그램에서 객체를 생성하면 메모리 공간이 동적으로 확보된다. 사용하지 않는 객체의 메모리 영역은 **가비지 컬렉터**가 자동으로 해제한다. 이 메커니즘을 '가비지 컬렉션(garbage collection)'이라고 한다. 이때 사용하지 않는 객체란 다른 객체의 프로퍼티와 변수가 참조하지 않는 객체를 말한다.
```javascript
var p = {x:1, y:2};
console.log(p); // Object {x=1, y=2}
p = null;       // Object {x=1, y=2}를 참조하지 않게 됨
```
이 코드의 세 번째 줄이 실행되면 객체 {x:1, y:2}는 그 어떤 변수에도 참조하지 않는 상태가 된다. 따라서 가비지 컬랙터는 객체 {x:1, y:2}를 메모리에서 해제한다. 이 덕분에 프로그래머는 메모리 관리를 전혀 고려하지 않아도 많은 것을 구현할 수 있다. 그러나 메모리 관리를 무시하여 필요 없어진 객체가 계속 남아 있어 **메모리 누스**가 발생하면 시스템의 성능이 크게 저하될 수 있고 심해지면 컴퓨터가 일시적으로 멈출 수도 있다.

클로저
======
자바스크립트의 모든 함수는 클로저를 정의한다. 클로저는 자바스크립트가 가진 강력한 기능으로, 이를 활용하면 변수를 은닉하여 지속성을 보장하는 등의 다양한 기능을 구현할 수 있다.

클로저
------
**클로저**(closure, 함수 폐포)를 프로그래밍 언어적인 관점에서 설명하면 다음과 같은 동작을 하는 함수와 그 기능을 구현한 자료 구조의 모음이라고 할 수 있다.<br/>
`자기 자신이 정의된 환경에서 함수 안에 있는 자유 변수의 식별자 결정을 실행한다.`<br/>
```javascript
var a = "A";
function f() {
    var b = "B";
    function g() {
        var c = "C";
        console.log(a+b+c);
    }
    g();
}
f();  //ABC
```
위 코드에서 함수 g의 함수 객체와 객체가 참조하는 렉시컬 환경 컴포넌트가 자유 변수 a, b의 식별가 결정을 위한 자료 구조하고 할 수 있다. 이 자료 구조는 함수 f가 호출되어 함수 g가 평가되는 시점에 생성된다. 따라서 자바스크립트의 클로저는 함수 객체와 렉시컬 환경 컴포넌트의 집합이라고 할 수 있다. 이 예에서 함수 g의 함수 객체가 있는 동안에는 클로저 안의 모든 렉시컬 환경 컴포넌트를 함수 g의 함수 객체가 참조하므로 클로저는 가비지 컬렉션 대상이 되지 않는다. 따라서 함수 g의 함수 객체가 있는 한 클로저는 메모레에서 지워지지 않는다.

클로저의 성질
------
```javascript
function makeCounter() {
    var count = 0;
    return f;
    function f() {
        return count++;
    }
}
var counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
```
위 코드에서 외부 함수 makeCounter는 중첩 함수 f의 참조를 반환하고 중첩함수 f는 외부 함수 makeCounter의 지역 변수 count를 참조한다.

이름 공간
======

전역 이름 공간의 오염
------
전역 변수와 전역 함수를 전역 객체에 선언하는 행위를 가리켜 '전역 유효 범위를 오염시킨다'고 한다. 전역 유효 범위가 오염되면 다음과 같은 상황일 때 변수 이름과 함수 이름이 겹칠 수 있다.<br/>
　• 라이브러리 파일을 여러 개 읽어 들여 사용할 때<br/> 
　• 규모가 큰 프로그램을 만들 때<br/>
　• 여러 사람이 한 프로그램을 만들 때<br/>
전역 유효 범이 안에서 이름이 같은 변수나 함수를 선언하면 다른 목적으로 사용하는 코드가 같은 변수와 함수를 공유하게 되므로 프로그램이 올바르게 동작하지 않을 수 있다. 게다가 프로그램 오류로 표시되지 않으므로 찾아내기도 어렵다.

객체를 이름 공간으로 활용하기
------
**이름 공간**(name space)이란 변수 이름과 함수 이름을 한곳에 모아 두어 이름 충돌을 미리 방지하고, 변수와 함수를 쉽게 가져다 쓸 수 있게 만든 메커니즘이다. 자바스크립트에서는 기본적으로 이름 공간 기능을 제공하지 않지만 객체를 이름 공간으로 활용할 수 있다.<br/>
객체를 이름 공간으로 활용하면 객체를 값으로 가지는 전역 변수를 하나 생성하고, 그 객체에 프로그램 전체에서 사용하는 모든 변수와 함수를 프로퍼티로 정의한다. 예를 들어 다음과 같은 방법으로 myApp이라는 전역 변수를 이름 공간으로 활용할 수 있다.
```javascript
var myApp = myApp || {};
```
이렇게 작성해 두면 myApp이 이미 정의되어 있을 때는 그것을 사용하고 그렇지 않으면 빈 객체를 myApp에 할당한다.

함수를 이름 공간으로 활용하기
------
함수 안에서 선언된 변수의 유효 범위는 함수 내부이므로 그 변수를 함수 안에서는 읽거나 쓸 수 있지만 바깥에서는 읽거나 쓸 수 없다. 이 성질을 활용하면 함수를 이름 공간으로 활용할 수 있다.
```javascript
var x = "global x";
(function() {
    var x = "local x";
    var y = "local y";
})();
console.log(x); // global x
console.log(y); // Uncaught ReferenceError: y is not defined
```
즉시 실행 함수(Immediatelt-Invoked Function Expression, IIFE) 내부에서 선언한 변수인 x와 y는 이 함수의 지역 변수이르모 전역 변수와 이름이 충돌하지 않는다. 따라서 일시적인 처리를 수행하고자 할 때 그 내용물을 즉시 실행 함수 안에 작성하면 전역 유효 공간을 오염시키지 않고 실행할 수 있다.<br/>
라이브러리를 읽어 들여서 사용할 때 라이브러리 안에 있는 전역 변수와 출돌하지 않도록 하려면 전체 프로그램을 즉시 함수 안에 넣어서 실행한다.
```javascript
(function() {
    // 이곳에 프로그램을 작성한다
})();
```
이렇게 하면 프로그램 안에서 선언한 모든 변수가 즉시 실행 함수의 지역 변수가 되므로 전역 유효 공간을 전혀 오염시키지 않는다.<br/>
**모듈 패턴**<br/>
모듈은 기능(함수) 여러 개를 하나로 묶은 것이다. 일반적으로 모듈은 함수 여러 개와 함수가 공유하는 데이터로 구성된다. 모듈은 다양한 프로그램에서 사용하면 모듈 안에서 사용하는 변수 이름이나 함수 이름이 모듈을 사용하는 프로그램의 변수 이름이나 함수 이름과 충돌할 가능성이 있다. 이때 모듈을 즉시 실행 함수 안에 작성하여 실행하면 이름이 충돌하는 상활을 피할 수 있다. 하지만 즉시 실행 함수의 내부에 작성한 함수나 변수는 프로그램 바깥에서는 사용할 수 없다. 그래서 즉시 실행 함수에 객체로 구현한 이름 공간을 전역 변수로 넘겨서 공개할 함수를 이름 공간에 추가하도록 한다. 다음 코드가 전형적인 모듈 정의의 예이다.
```javascript
var Module = Module || {};
(function(_Module) {
    var name = "NoName";            // 프라이빗 변수
    function getName() {            // 프라이빗 함수
        return name;
    }
    _Module.showName = function(){  // 퍼블릭 함수
        console.log(getName());
    };
    _Module.setName = function(x) { // 퍼블릭 함수
        name = x;
    };
})(Module);
Module.setName("Tom");
Module.showName();  // Tom
```

객체로서의 함수
======
자바스크립트에서는 함수도 일종의 객체이다. 따라서 함수는 값을 처리할 수 있으며 프로퍼티와 메서드도 가지고 있다.

함수는 객체
------
자바스크립트의 함수는 Function 객체이다. 따라서 다른 객체와 마찬가지로 다음과 같은 특징이 있다.<br/>
　• 함수는 변수나 프로퍼티나 배열 요소에 대입할 수 있다.<br/> 
　• 함수는 함수의 인수로 사용할 수 있다.<br/>
　• 함수는 함수의 변환값으로 사용할 수 있다.<br/>
　• 험수는 프로퍼티와 메서드를 가질 수 있다.<br/>
　• 함수는 이름 없는 리터럴로 표현할 수 있다.(익명 함수)<br/>
　• 함수는 동적으로 생성할 수 있다.<br/>
일반적으로 이러한 작업이 가능한 객체를 가리켜 **일급 객체**라고 한다. 일급 객체의 함수는 **일급 함수**라고 한다.

함수의 프로퍼티
------

|프로퍼티 이름|설명|
|---|---|
|caller|현재 실행 중인 함수를 호출한 함수|
|length|함수의 인자 개수|
|name|함수를 표시할 때 사용하는 이름|
|prototype|프로토타입 객체의 잠조|

함수는 Funtion 생성자의 prototype 객체의 프로퍼티는 상속 받아서 사용한다.

|프로퍼티 이름|설명|
|---|---|
|apply()|선택한 this와 인수를 사용하여 함수를 호출한다. 인수는 배열 객체이다.|
|bind()|선택한 this와 인수를 적용한 새로운 함수를 반환한다.|
|call()|선택한 this와 인수를 사용하여 함수를 호출한다. 인수는 쉼표로 구분한 값이다.|
|constructor()|Function 생성자의 참조|
|toString()|함수의 소스 코드를 문자열로 만들어 반환한다.|

apply와 call 메서드
------
apply와 call의 동작은 본질적으로 같다. 차이점은 함수에 인수를 넘기는 방법뿐이다. apply의 인수는 배열이고 call의 인수는 쉼표로 구분한 값의 목록이다. apply와 call 메서드의 첫 번째 인수는 함수의 this 값이다. apply 메서드의 두 번째 인수는 함수의 인수를 순서대로 담은 배열이다. call 메서드의 두 번째 인수 이후 인수는 함수의 인수 목록이다. 
```javascript
function say(greetings,honorifics) {
    console.log(greetings + " " + honorifics + this.name);
}
var tom = { name: "Tom Sawyer" };
var becky = { name: "Becky Thatcher" };
say.apply(tom, ["Hello!","Mr."]); // "Hello! Mr.Tom Sawyer"
say.apply(becky, ["Hi!","Ms."]);  // "Hi! Ms.Becky Thatcher"
say.call(tom, "Hello!", "Mr.");    // "Hello! Mr.Tom Sawyer"
say.call(becky, "Hi!","Ms.");     // "Hi! Ms.Becky Thatcher"
```

bind 메서드
------
bind 메서드는 객체에 함수를 바인드한다.
```javascript
function say(greetings,honorifics) {
    console.log(greetings + " " + honorifics + this.name);
}
var tom = { name: "Tom Sawyer" };
var sayToTom = say.bind(tom);
sayToTom("Hello!","Mr.");  // Hello! Mr.Tom Sawyer
```

함수에 프로퍼티 추가하기
------
함수에도 프로퍼티를 추가할 수 있다.
```javascript
function f(x) { ... }
f.p = a;
f.g = function() { ... };
```
Function 객체에 추가된 프로퍼티는 그 함수를 실행하지 않아도 읽거나 쓸 수 있다.<br/>
함수에 프로퍼티를 추가하는 응용 예제로 **메모이제이션**이 있다. 메모이제이션이란 함수를 호출했을 때의 인수와 반환값을 한 쌍으로 만들어 자장해 두는 기법을 말한다. 함수에 메모이제이션을 적용해 두면 한 번 건네받은 이력이 있는 인수의 결괏값으로 저장해 둔 결과를 반환하므로 추가적인 계산을 생략할 수 있다.<br/>
다음 예제는 피보나치수열을 구하는 함수를 정의할 때 함수의 프로퍼티에 반환값을 저장한다. 피보나치수열은 다음과 같은 점화식으로 정의된다.<br/>
<p align="center"><img src="/Week2/img/Modern_Javascript_8_8_1.jpg"></p><br/>
함수 fibonacci는 스스로 반환값을 함수의 프로퍼티에 저장하면서 피보나치수열을 구하는 재귀 함수이다. 피보나치수열의 0항부터 20항까지를 계산하는 데 메모이제이션을 적용하지 않으면 총 덧셈 횟수가 28635번에 달하지만 메모이제이션을 적용하면 19번으로 줄어든다.
```javascript
function fibonacci(n) {
    if(n<2) return n;
    if(!(n in fibonacci)) {
        fibonacci[n] = fibonacci(n-1) + fibonacci(n-2);
    }
    return fibonacci[n];
}
for(var i=0; i<=20; i++) {
    console.log(("  "+i).slice(-2)+":"+fibonacci(i));
}
```
실행 결과는 다음과 같다.
<p align="center"><img src="/Week2/img/Modern_Javascript_8_8_2.png" width="100" height="500"></p><br/>

고차 함수
======
고차 함수를 이용하여 작업을 한곳에 모아 추상화를 하면 프로그램의 가독성과 유지 보수성을 향상시킬 수 있다.

고차 함수
------
고차 함수란 함수를 인수로 받는 함수 또는 함수를 반환하는 함수를 말한다. 고차 함수를 사용하면 처리 패턴이 같은 작업을 추상화하여 하나로 합칠 수 있다.<br/>

간단한 예
------
다음 코드는 수열을 표현하는 프로그램이다.
```javascript
digits = "";
for(var i=0; i<10; i++) {
    digits += i;
}
console.log(digits); // 0123456789
```
다음 코드는 무작위 알파벳 문자열을 표시하는 프로그램이다.
```javascript
randomChars = "";
for(var i=0; i<8; i++) {
    randimChars += String.fromCharCode(Math.floor(Math.random()*26) + "a".charCodeAt(0));
}
console.log(randomChars); // dizohqsf : 무작위 알파벳 문자열
```
위 두 프로그램은 하는 일이 다르지만 사용하는 로직이 같다. 공통 부분을 고차 함수로 만들어서 하나로 만들면 다음과 같다.
```javascript
function joinStrings(n,f) {
    var s ="";
    for(var i=0; i<n; i++) {
        s += f(i);
    }
    return s;
}
```
고차 함수 joinStrings를 사용하여 앞에서 작성한 두 함수와 같은 작업을 하는 함수를 생성하면 다음과 같다.
```javascript
var digits = joinStings(10, function(i) { return i; });
var randomChars = joinStrings(8, function(i) {
    return String.fromCharCode(Math.floor(Math.random()*26) + "a".charCodeAt(0));
});
console.log(digits);        // 0123456789
console.log(randomChars);   // nzsfhnwf
```

메모이제이션
------
함수 fibonacci는 함수의 프로퍼티에 그 함수의 반환값을 기록하는 기법이 적용되었다. 다음 예제의 함수 memorize는 인수로 함수를 받고 그 함수를 메모이제이션(memoization)기법을 적용한 함수로 가공해서 반환한다.
```javascript
function memorize(f) {
    var cache = {};
    return function(x) {
        if(cache[x] == undefined) cache[x] = f(x);
        return cache[x];
    }
}

function isPrime(n) {
    if(n<2) return false;
    var m = Math.sqrt(n);
    for(var i=2; i<=m; i++) if( n%i == 0 ) return false;
    return true;
}

var isPrime_memo = memorize(isPrime);
var N = 1000;
for(var i=2; i<=N; i++) isPrime_memo(i);
// 쌍둥이 소수의 목록을 출력
for(var i=2; i+2<=N; i++) {
    if( isPrime_memo(i) && isPrime_memo(i+2)) console.log(i + "," + (i+2));
}
```
실행 결과는 다음과 같다.<br/>
<p align="center"><img src="/Week2/img/Modern_Javascript_8_9_1.png" width="100" height="500"></p><br/>
memorize 함수는 인수로 받은 함수의 실행 결과를 객체 cache 안에 저장한다. 이 덕분에 인수로 받은 함수를 같은 인수로 실행하면 실제 계산을 하는 대신 cache에 저장된 값을 반환하는 함수가 만들어진다. 재귀 함수에 메모이제이션을 적용하면 원래 함수를 재귀 호출하는 대신 메모이제이션된 함수를 재귀 호출하도록 만들어야한다.

함수의 합성
------
함수 f(x)와 g(x)가 있을 때 함수 f(g(x))를 f와 g의 합성 함수라고 한다. 다음 예제의 함수 compose는 인수로 받은 함수를 순차적으로 합성한 함수를 반환한다.
```javascript
function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}

var square = function(x) { return x*x; };
var add1 = function(x) { return x+1; }
var h = compose(square, add1);  // h(x)=(x+1)*(x+1)
console.log(h(2));              // 9
```

부분 적용
------
인수를 여러 개 받는 함수의 몇몇 인수를 상수로 저장해서 새로운 함수를 생성하는 기법을 가리켜 부분 적용이라고 한다.
```javascript
function product(x, y) { return x*y; }
product2 = function(y) { return prodect(2,y); };
// product2 = product.bind(null, 2); : bind 메서드를 사용
product2(3); // 6
```

커링
------
커링이란 인수를 두 개 이상 받는 함수를 분해하여 인수가 하나인 함수의 중첩 함수로 변환하는 작업을 말한다.
```javascript
var pow = function(exponent) {
    return function(base) {
        return Math.pow(base, exponent);
    };
}; // 함수 pow는 Math.pow를 커링한 것이다.
Math.pow(base, exponent) = pow(exponent)(base)

var square = pow(2);
var sqrt = pow(.5);
var cubicroot = pow(1/3);
```

콜백 함수
======
콜백 함수
------
다른 함수에 인수로 넘겨지는 함수를 가리켜 콜백 함수라고 부른다.
```javascript
f(g, ...);
...
function f(callback, ... ) {
    ...
    callback();
    ...
}
```
이 코드에서 함수 f의 인수로 넘겨진 함수인 g가 콜백 함수이다. 이렇게 작성하면 호출한 함수 f안에서 특정 콜백 함수를 실행시켜서 그 콜백 함수에 제어권을 부여할 수 있다. 콜백 함수는 함수를 호출할 때 무언가 새로운 일이 생기거나 그 함수의 실행이 끝나면 지정한 콜백 함수를 실행해 주도록 함수에 요청해야 할 때 사용한다. 이때 콜백 함수의 주체는 어디까지나 함수를 호출한 호출자이다. 호출자가 목적에 따라 어떠한 콜백 함수를 사용할 것인지 정한다. 호출된 함수는 콜백 함수를 실행하지만 그 콜백 함수가 작업하는 내용에는 관여하지 않는다.

이벤트 처리기
------
```javascript
button.onclick = function() { ... };
button.addEventListener("click", function() { ... }, false);
```
이 함수를 호출할 때 무언가 사건이 발생하면 콜백 함수를 실행하도록 인수로 넘기는 행위와 닮았다.

타이머
------
타이머 메서드(setTimeout, setInterval)에 첫 번째 인수로 넘기는 함수가 바로 콜백 함수이다.
```javascript
setInterval(function() { ... }, 2000);
```

ECMAScript 6부터 추가된 함수의 기능
======
이 절에서는 ECMAScript 6부터 추가된 함수의 기능(화살표 함수, 나머지 매개변수, 인수의 기본값, 이터레이터, 제너레이터, 템플릿 리터럴의 태그 함수)을 배운다.

화상표 함수 표현식으로 함수 정의하기
------
화살표 함수 표현식은 함수 리터럴(익명 함수)의 단축 표현이다. 그러나 함수 리터럴과 완전히 같은 건 아니므로 주의해야 한다.<br/>

**화살표 함수 표현식의 작성법**<br/>
```javascript
var square = function(x) { return x*x; }; // 함수 리터럴로 함수를 정의
var square = (x) => { return x*x; };      // 화살표 함수 표현식으로 함수를 정의
var f = (x, y, z) => { ... };             // 인수가 여러 개 있을 때
var square = x => { return x*x; };        // 인수가 하나만 있으면 괄호를 생략할 수 있음
var f = () => { ... };                    // 인수가 없으면 인수를 묶는 괄호는 생략할 수 없음
var square = x => x*x;                    // 함수 몸통 안의 문장이 return뿐이면 중괄호와 return 키워드를 생략할 수 있음
var f = (a, b) => ( {x: a, y: b} );
// 함수 몸통 안에 return 문장만 있더라고 함수의 반환값이 객체 리터럴이면 객체 리터럴을 그룹 연산자인 ()로 묶어야 함
(x => x*x)(3);                            // 화살표 함수도 즉시 실행 함수(IIFE)로 사용할 수 있음
```

**함수 리터럴과 화살표 함수의 차이점**<br/>
①this의 값이 함수를 정의할 때 결정된다<br/>
함수 리터럴로 정의한 함수의 this 값은 함수를 호출할 때 결정되지만 화살표 함수의 this 값은 함수를 정의할 때 결정된다.<br/>
②arguments 변수가 없다<br/>
③생성자로 사용할 수 없다<br/>
화살표 함수 앞에 new 연산자를 붙여서 호출할 수 없다.<br/>
④yield 키워드를 사용할 수 없다<br/>

인수에 추가된 기능
------
**나머지 매개변수**<br/>
함수의 인자가 들어가는 부분에 ...을 입력하면 그만큼의 인수를 배열로 받을 수 있다. 이렇게 ...으로 표현한 인자를 가리켜 나머지 매개변수(rest parameters)라고 부른다.
```javascript
function f(a, b, ... args) {
    console.log(a, b, args);
}
f(1, 2, 3, 4, 5, 6);    // 1 2 [3, 4, 5, 6]
```
화살표 함수 안에서는 arguments를 사용할 수 없지만 나머지 매개변수를 사용하면 화살표 함수안에서도 가변 인수를 이용할 수 있다.
```javascript
var sum = ( ... args) => {
    for(var i=0; s=0; i<args.length; i++) s+=args[i];
    return s;
};
sum(1, 2, 3, 4, 5); // 15
```
**인수의 기본값**<br/>
함수의 인자에 대입(=) 연산자를 사용해서 기본값을 설정하 수 있다. 기본값을 설정한 인자에 호응하는 인수를 생력하거나 undefined를 넘기면 대입 연산자 우변의 값이 기본값이 된다.
```javascript
function multiply(a, b=1) {
    return a*b;
}
multiply(3);    // 3
multiply(3, 2);  // 6

function add(a, b=a+1) {
    return a+b;
}
add(2);         // 5
add(2, 1);      // 3
```

이터레이터와 for/of 문
------
**이터레이션**<br/>
이터레이션(iteration)은 반복 처리라는 뜻으로 데이터 안의 요소를 연속적으로 꺼내는 행위를 말한다. 예를 들어 배열의 forEach 메서드는 배열의 요소를 순차적으로 검색하여 그 값을 함수의 인수로 넘기기를 반복한다.
```javascript
var a = [5, 4, 3];
a.forEach(function(val) { console.log(val); });
// 실행 결과 :
// 5
// 4
// 3
```
**이터레이터**<br/>
이터레이터(iterator)란 반복 처리(iteration)가 가능할 객체를 말한다. 앞의 forEach 메서드는 배열의 요소를 꺼내 그 값을 함수의 인수로 넘기고, 그 작업이 끝나면 배열의 다음 요소를 꺼내 함수의 인수로 넘기기를 반복한다.<br/>
다음 예는 배열의 이터레이터이다. 배열은 Symbol.iterator메서드를 가지고 있다. 배열의 Symbol.iterator 메서드는 이터레이터를 반환하는 함수이다.
```javascript
var a = [5, 4, 3];
var iter = a[Symbol.iterator]();
console.log(iter.next());   // Object {value: 5, done: false}
console.log(iter.next());   // Object {value: 4, done: false}
console.log(iter.next());   // Object {value: 3, done: false}
console.log(iter.next());   // Object {value: undefined, done: true}
console.log(iter.next());   // Object {value: undefined, done: true}
```
위에서 iter의 next 메서드를 호출할 때마다 **이터레이터 리절트**(iterator result)라는 객체가 반환된다. 이터레이터 리절트는 value와 done 프로퍼티를 갖는 객체이다. next 메서드가 호출될 때마다 value 프로퍼티에는 차례대로 꺼내진 배열 요소의 값이 저장되고 done 프로퍼티에는 요소의 열거가 끝났는지를 뜻하는 논리값이 저장된다.

**반복 가능한 객체와 for/of 문**<br/>
이터레이터를 사용해서 이터레이션을 하려면 개발자가 적절한 처리를 직접 작성해야 한다. 예를 들어 배열의 요소를 이터레이터를 사용해서 목록으로 바꾸려면 다음과 같이 작성해야 한다.
```javascript
var a = [5, 4, 3];
var iter = a[Symbol.iterator]();
while(true) {
    var iteratorResult = iter.next();
    if( iteratorResult.done == true ) break;
    var v = iteratorResult.value;
    console.log(v);
}
// 실행 결과:
// 5
// 4
// 3
```
for/of 문을 사용하면 이러한 반복 처리를 자동으로 하도록 만들 수 있다.
```javascript
var a = [5, 4, 3];
for(var v of a) console.log(v);
```
for/of 문은 a 이터레이터의 next 메서드를 순회할 때마다 매번 호출한다. 이터레이터 리절트의 done 프로퍼티 값이 false가 아닌 동안은 value 프로퍼티 값을 변수 v에 대입해서 for/of 문 안에 있는 코드를 실행한다. 이처럼 for/of 문을 사용하면 이터레이터의 반복 처리를 간결하게 표현 할 수 있다.

제너레이터
------
**제너레이터**<br/>
제너레이터는 다음과 같은 성질을 지닌 함수이다.<br/>
　• 반복 가능할 이터레이터를 값으로 반환한다.<br/>
　• 작업의 일시 정지와 재시작이 가능하며 자신의 상태를 관리한다.<br/>
제너레이터는 이터레이터의 반복 처리를 강력하게 지원한다. 제너레이터를 활용하면 반복 알고리즘을 독자적으로 구현한 이터레이터보다 유연하게 표현할 수 있다.<br/>
<br/>**제너레이터의 정의와 실행**<br/>
제너레이터는 function* 문으로 정의한 함수이며, 하나 이상의 yield 표현식을 포함한다.
```javascript
function* gen() {
    yield 1;    // 포인트 1
    yield 2;    // 포인트 2
    yield 3;    // 포인트 3
}
var iter = gen();
console.log(iter.next());   // Object {value: 1, done: false}
console.log(iter.next());   // Object {value: 2, done: false}
console.log(iter.next());   // Object {value: 3, done: false}
console.log(iter.next());   // Object {value: undefined, done: true}
```
yield라는 단어에는 '산출하다'라는 뜻이 있다. yield에 저장한 값은 next 메서드의 반환값이되어 바깥으로 산출된다. yield 문의 사용법은 return 문의 사용법과 같다. 즉, 다음 사용법 중 하나이다.
```javascript
yield;
yield 표현식;
```
yield 표현식은 yield에 저장한 **표현식**을 값으로 가지며 이 자체를 변수에 대입할 수 있다. 제너레이터로 생성한 이터레이터는 반복할 수 있기 때문에 for/of 문으로 반복해서 처리할 수 있다.
```javascript
var a = yield 2;                    // a 값은 2가 됨
for(var v of iter) console.log(v);  // 1, 2, 3을 순서대로 표시한다
```
아래 예제는 값을 반환하는 이터레이터를 생성하는 함수로 제너레이터를 활용한다.
```javascript
function* creatNumbers(from,to) {
    while( from <= to ) yield from++;
}
var iter = createNumbers(10, 20);
for(var v of iter) console.log(v); // 10~20 사이의 정수를 순서대로 출력한다
```
다음 예제는 무작위 행보를 시뮬레이션한다. 이 예제에서는 제너레이터를 이터레이터를 생성하는 함수로 활욯하지 않는다. 실행 도중에 일시적으로 정지할 수 있는 함수로 활용한다. 무작위 행보란 다음의 진행 방향이 무작위인 운동을 말한다. 제너레이터 함수 randomWalk는 좌표 점 (x0, y0)에서 출발하고 이동 거리는 d이며 0º, 90º, 180º, 270º의 네 가지 방향을 무작위로 선택하는 무작위 행보를 구현한다. 이동 거리를 고정하고 운동 방향만 네가지 방향으로 제한한 점이 2차원 배열을 활보한다.
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>무작위 행보</title>
    <script>
        function* randomWalk(c, x0, y0, d) {
          var dx = [1, 0, -1, 0], dy = [0, 1, 0, -1]; // 이동 방향
          var x = x0;
          var y = y0;
          c.strokeStyle = "red";
          c.golbalAlpha = 0.25;
          while(true) {
            yield;
            c.beginPath();
            c.moveTo(x,y);
            var dir = Math.floor(Math.random()*4); // 0~3 사이의 난수
            x += d*dx[dir];
            y += d*dy[dir];
            c.lineTo(x,y);
            c.stroke();
          }
        }
        window.onload = function() {
            var canvas = document.getElementById("mycanvas");
            var ctx = canvas.getContext("2d");
            var iter = randomWalk(ctx, 300, 300, 4, "red");
            setInterval(function() { iter.next(); }, 10);
        };
    </script>
    <style>
        #mycanvas { border: 1px solid gray; }
    </style>
</head>
<body>
    <canvas id="mycanvas" width=600 height=600></div>
</body>
</html>
```
<p align="center"><img src="/Week2/img/Modern_Javascript_8_11_1.png" width="400" height="400" ></p><br/>

**제너레이터에 값 넘기기**<br/>
제너레이터로 생성한 이터레이터의 next 메서드에 값을 대입하면 제너레이터에 값을 넘길 수 있다. next 메서드에 넘긴 값은 제너레이터가 일시적으로 정지하기 직전의 yield 표현식의 값으로 사용된다. 이를 활용하면 제너레이터의 내부 상태를 외부에서 변경할 수 있다.

**제너레이터 종료하기 : return 메서드**<br/>
제너레이터로 생성한 이터레이터의 return 메서드를 실행하면 인수 값을 반환한 후에 제너레이터를 종료한다.
```javascript
function* g() {
    yield 1;
    yield 2;
    yield 3;
}
var iter = g();
iter.next();        // Object {value: 1, done: false}
iter.return(10);    // Object {value: 10, done: true}
iter.next();        // Object {value: undefined, done: true}
```
**제너레이터에 예외 던지기 : throw 메서드**<br/>
제너레이터로 생성한 이터레이터의 throw 메서드를 실행하면 예외를 제너레이터에 던질 수 있다. 제너레이터의 예외는 일반적으로 try/catch 문으로 받아서 처리한다.
```javascript
function* idMaker() {
    var count = 0;
    while(true) {
        try{
            yield count++;
        } catch(e) {
            console.log("오류가 발생했습니다");
        }
    }
}
var iter = idMaker();
console.log(iter.next());       // Object {value: 0, done: false}
console.log(iter.next());       // Object {value: 1, done: false}
iter.throw(new Error("오류"));  // 오류가 발생했습니다
                                // Object {value: 2, done: false}
```
**반복 가능한 객체에 위임하기 : yield\***<br/>
제너레이터 함수 안에서는 yield 표현식 외에도 yield* 표현식을 사용할 수 있다. yield*에는 반복 가능한 객체를 지정한다. 그러면 반복 가능한 객체에서 순차적으로 값을 꺼내 각각의 값에 yield를 적용한다.
```javascript
function* f() {
    yield "X";
    yield "Y";
}
function* g() {
    yield 0;
    yield* [2,4];
    yield* "AB";
    yield* f();
}
var iter = g();
for(var v of iter) console.log(v);  // 0, 2, 4, A, B, X, Y의 순서대로 출력
```

템플릿 리터럴의 태그 함수
------
이 절에서는 함수를 템플릿 리터럴에 적용하는 방법인 '태그가 지정된 템플릿 리터럴(tagged template literal)'을 소개한다.<br/>
<br/>**태그가 지정된 템플릿 리터럴**<br/>
템플릿 리터럴 앞에 함수 이름을 적으면 템플릿 리터럴의 내용을 인수로 받는 함수를 호출할 수 있다.
```javascript
func '${a} + ${b} = ${a+b}'
```
이 코드에서 func 부분을 '태그 함수(tag function)'라고 한다. 태그 함수의 첫 번째 인수는 문자열을 요소로 담은 배열이다. 이 배열의 요소는 템플릿 리터럴 안의 문자열을 ${ ... }를 기준으로 분할한 문자열이다. 두 번째 인수로는 각 ${ ... } 안에 지정된 표현식을 평가한 값이 순서대로 들어간다. 태그 함수의 반환값이 반드시 문자열일 필요는 없으며 그 어떤 값도 반환할 수 있다.
```javascript
function list() { return arguments; }
var t = list'a${1}b${2}c${3}';
console.log(t);     // [["a", "b", "c", ""], 1, 2, 3]
``` 
템플릿 리터럴의 시작 부분이 ${ ... }면 태그 함수의 첫 번째 인수인 배열의 첫 번째 요소로 빈 문자열이 들어온다. 끝 부분이 ${ ... }로 끝나면 태그 함수의 첫 번째 인수인 배열의 마지막 요소로 빈 문자열이 들어온다.<br/>
다음 예제의 함수 htmlEscape는 템플릿 리터럴 안의 플레이스 홀더에서 HTML에서 사용할 수 없는 문자(&, <, >, ', ", \`)를 이스케이프 시퀀스로 바꾼다. escape 함수는 정규 표현식을 사용하여 문자열 안의 &, <, >, ', ", \` 문자를 각각에 대응하는 이스케이프 시퀀스로 바꾼다.
```javascript
function htmlEscape(string, ...values) {
    var result = string[0];
    for(var i=0; i<value.length; i++) {
        result += escape(value[i]) + string[i+1];
    }
    return result;
    function escape(s) {
        return s.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/'/g, "&#039;")
               .replace(/"/g, "&quot;")
               .replace(/`/g, "&#096;")
    }
}
var userinput = "<script>alert('test');</script>";
var message = htmlEscape`<p>${userinput}</p>`;
console.log(message);   // <p>&lt;script&gt;alert(&#039;test&#039;);&lt;/script&gt;</p>
```
태그가 지정된 템플릿 리터럴은 이스케이프 시퀀스 처리 외에도 문자열의 가독성 향상과 국제화(다른 언어권에서 사용하는 언어의 지원) 등의 다양한 문자열 처리에 활용할 수 있다.<br/>
<br/>**태그 함수의 첫 번째 인수**<br/>
태그 함수의 첫 번째 인수는 callSite 객체라고 하며 다음과 같은 특징이 있다.<br/>
①동결되어 있다<br/>
첫 번째 인수는 동결된 객체로 읽기만 할 수 있다. 프로퍼티의 추가, 삭제, 변경은 모두 불가능하다.<br/>
②callSite 객체는 캐시된다<br/>
태그 함수는 이전에 처리했던 템플릿 리터럴 문자열을 만나면(플레이스 홀더는 제외) 캐시된 callSite 객체를 첫 번째 인수로 넘긴다.<br/>
③raw 프로퍼티가 있다.<br/>
callSite 객체에는 raw 프로퍼티가 있다. raw 프로퍼티 값은 배열이며 그 요소는 첫 번째 인수의 배열과 마찬가지로 템플릿 리터럴을 ${ ... }로 분할한 문자열이다. 첫 번째 인수의 배열에는 이스케이프된 문자열이 들어오지만 raw 프로퍼티에는 이스케이프되지 않은 문자열이 들어온다.<br/>

# 9장


# 10장


# 11장
버그에 대처하기
======
버그는 프로그램의 오류나 결함을 뜻한다. 프로그램에 발생한 버그의 원인을 파악하여 제거하고 프로그램이 제대로 동작하도록 수정하는 작업을 디버그(debug)라고 한다.

버그의 원인
------
**① 논리적인 버그**<br/>
논리적인 버그는 프로그램의 바탕이 되는 알고리즘 자체에 오류가 있거나 알고리즘을 프로그램으로 구현하는 방법이 잘못되었을 때 발생한다.<br/>
**② 오타**<br/>
오타는 개발자가 의도하지 않은 동작을 유발한다. 작은 오타도 프로그램에 심각한 오류를 발생시킬 가능성이 있다.<br/>
**③ 실행 환경의 변화**<br/>
컴퓨터, OS, 프로그래밍 언어 자체의 사양이 바뀌어 프로그램이 동작하지 않는 경우도 있다. 이 상황은 버그가 아니지만 원인을 찾아 수정해야 한다.

Strict 모드 사용
------
ECMAScript 5부터 추가된 Strict 모드는 자바스크립트 언어의 사양 중에서 버그를 일으키기 쉬운 부분을 제거한다. 이는 버그를 최대한 발생하지 않게 만들거나 버그가 발생했을 때 즉시 알 수 있도록 언어의 사양을 더욱 엄격하게 제한한다.<br/>
**Strict 모드 설정**<br/>
프로그램을 Strict 모드로 실행하려면 스크립트의 첫머리(모든 문장 앞에) 또는 함수의 첫머리(모든 문장 앞에)에 "use strict";을 입력한다.
```javascript
function f(x){
    "use strict";
    y = x;
}
f(2);
// Uncaught ReferenceError: y is not defined(...)
```
스크립트가 여러 개 있을 때 Strict 모드는 모든 스크립트에 반영되자 않고 스크립트 단위로 적용된다.
```html
<script>
    "use strict"; // 이 스크립트는 Strict 모드로 동작함
</script>
<script>
    x = 2;        // 이 스크립트는 비 Strict 모드로 동작함
</script>
```
**Strict 모드를 설정하면 바뀌는 점**<br/>
① 변수는 모두 선언해야만 한다. 선언되지 않은 변수, 함수, 함수의 인자에 값을 대입하면 ReferenceError가 발생한다.<br/>
② 함수를 직접 호출할 때, 함수 안의 this 값이 undefined가 된다.<br/>
③ with 문은 사용할 수 없다.<br/>
④ 함수 정의문에 같은 이름의 인수가 있으면 문법 오류가 발생한다.<br/>
⑤ 객체에 같은 이름의 프로퍼티가 있으면 문법 오류가 발생한다.<br/>
⑥ NaN, Infinity, undefined를 표기하면 TypeError가 발생한다.<br/>
⑦ arguments[i]는 호출되어을 때의 인수 값을 유지한다.<br/>
⑧ arguments.callee를 읽을 수 없다. 읽기를 시도하면 TypeError가 발생한다.<br/>
⑨ eval로 실행한 코드는 호출자의 유효 범위 안에 새로운 변수나 함수를 선언할 수 없다.<br/>

스타일 가이드 활용하기
------
스타일 가이드란 프로그램을 작성할 때 버그를 피하고 가독성을 높이기 위해 권장되는 코딩 규칙을 정리한 것이다. 특히 여러 사람이 함께 프로그램을 개발한다면 스타일 가이드를 참고하여 전체적인 코딩 규칙을 정해두면 좋다.

console 디버깅
------
프로그램의 특정 위치에서 Console 객체의 메서드를 실행하면 그 시점의 프로그램 상태를 확인할 수 있다. 그 확인 결과에 따라 프로그램이 의도한 대로 동작하는지 확인하고 문제의 원인을 추적할 수 있다. 다음 두 메서드를 가장 많이 사용한다.<br/>
**① console.log로 변수 값을 표기하기**<br/>
**② console.dir로 객체의 프로퍼티 목록을 표시하기**<br/>
또한 console.trace 메서드를 사용하면 실행 중인 함수의 호출 스택을 볼 수 있다. 이는 함수가 어디에서부터 호출되었는지 콘솔에 표시된다.

웹 브라우저의 개발자 도구를 사용한 디버깅
------
대부분의 자바스크립트 실행 환경은 효율적인 디버깅을 위한 디버거 기능을 제공한다. 디버거 기능을 사용하면 현재의 변수 값과 처리가 어떻게 진행되고 있는지 console을 사용할 때보다 더욱 자세히 알아볼 수 있다. 처리 흐름을 제어할 수 있을 뿐만 아니라 실행 중인 코드를 수정하는 기능도 갖추고 있어서 때로는 코드 수정 없이도 디버깅할 수 있다.

프로그램 테스트
------
프로그램 테스트란 프로그램이 의도한 대로 동작하는지 확인하는 작업을 말한다. 프로그램 테스트로 버그를 찾을 수는 있지만 버그가 없다는 사실을 증명할 수는 없다. 프로그램 테스트는 각 함수의 동작을 확인하는 **단위 테스트**, 단위 테스트를 통과한 프로그램을 결합해서 수행하는 **통합 테스트**, 모든 프로그램을 결합하여 전체 프로그램이 사양에 따라 작동하는지 확인하는 **시스템 테스트**, 완성된 프로그램을 실제 사용자가 테스트하는 **운용 테스트** 순으로 실시한다.

예외 처리
======
예외란 간단히 말해 오류이다. 일반적으로 프로그램에 오류가 발생하면 그 프로그램은 강제로 종료되지만 자바스크립트 프로그램에서 발생한 오류는 굳이 프로그램을 종료하지 않아도 오류만 적절하게 처리하면 프로그램을 계속 실행시킬 수 있다.

예외
------
프로그램을 실행하는 도중에 예기치 않은 오류가 발생할 수도 있고, 오류는 아니지만 어떤 대처가 필요한 예외적인 상황이 발생할 수 있다. 예외란 오류 및 예외 조건이 발생한 사실을 알려 주는 신호이다. **예외를 던지는**(exeception throw)방법으로 예외 조건이 발생했다는 사실을 통지한다. 통지를 받은 쪽은 **예외를 받아서**(catch) 적절하게 처리를 한다. 예외를 받아서 처리하는 부분을 가리켜 예외 처리기라고 한다.<br/>
자바스크립트에는 throw 문으로 예외를 던지고 try/catch/finally 문으로 예외를 잡아서 처리한다.

throw 문
------
throw 문은 예외를 던진다.
```javascript
throw 표현식;
```
표현식으로는 어떤 타입의 값도 지정할 수 있다. 사용자에게 표시할 오류 메시지가 포함된 문자열이나 오류 코드를 의미하는 숫자도 허용된다.
```javascript
function permutation(a) {
    if( !(a instanceof Array) ) {
    // instanceof 연산자는 특정 객체의 프로토타입 체인에 특정 생성자의 프로토타입 객체가 포함되어 있는지를 판정한다.
        throw new Error(a + " is not an array");
    }
    return a.reduce(function(list,element) {
        var newlist = [];
        list.forEach(function(seq) {
            for(var i=seq.length; i>=0; i--){
                var newseq = [].concat(seq);
                newseq.splice(i, 0, element);
                newlist.push(newseq);
            }
        });
        return newlist;
        }, [[]] );
}
permutation("ABC"); // Error: ABC is not an array
```
예외를 던지면 자바스크립트 인터프리터는 프로그램의 실행을 중단하고 바깥 블록에서 예외를 처리하는 예외 처리기를 찾는다. 예외 처리가는 catch이다. 예외 처리기가 없으면 프로그램을 종료한다.

Error 객체
------
자바스크립트에는 예외를 표현하기 위한 내장 객체가 일곱 개 준비되어 있는데 그중 Error 객체는 범용적인 예외를 표현하기 위한 객체고 나머지 여섯 개는 특정 예외가 발생했을 때 표현하기 위한 객체이다.

|생성자|생성하는 인스턴스|
|:---:|---|
|Error|범용적인 예외 객체|
|EvalError|eval 함수와 관련해서 발생된 예외 객체|
|RangeError|숫자 값이 허용 범위를 벗어났을 때 발생하는 예외 객체|
|ReferenceError|잘못된 참조를 만났을 때 발생하는 예외 객체|
|SyntaxError|자바스크립트 문법에 어긋나는 구문을 만났을 때 발생하는 예외 객체|
|TypeReeoe|변수 및 인수 타입이 유효하지 않을 때 발생하는 예외 객체|
|URIError|encodeURI와 decodeURI 메서드에 잘못된 인수가 전달되었을 때 발생하는 예외 객체|

예외를 표현하는 모든 내장 객체는 Error.prototype의 프로퍼티와 메서드를 상속받는다. Error.prototype의 프로퍼티는 다음과 같다.<br/>
`message : 오류 메시지를 뜻하는 문자열`<br/>
`name : 오류 이름을 뜻하는 문자열`<br/><br/>
Error.prototype의 메서드는 다음과 같다.<br/>
`toString : 지정된 객체를 표현하는 문자열을 반환`<br/>

try/catch/finally 문
------
try/catch/finally 문은 예외가 던져졌을 때 그것을 잡아서 처리한다.
```javascript
try{
    // 이곳에 실행할 코드를 적는다(예외가 발생할 수 있는 코드)
} catch(exception){
    // 이 블록은 try 블록에서 예외가 발생했을 때 실행된다.
    // exception에는 던져진 예외 값이 들어옴. 이 값을 바탕으로 예외를 처리한다.
} finally{
    // 이 블록 안의 코드는
    // try 블록 코드와 catch 블록 코드가 실행된 이후에 반드시 실행된다.
}
```
try 블록 안에 예외가 발생할 가능성이 있는 코드를 작성한다. try 블록 다음에 catch 블록과 finally 블록 중 하나를 작성하거나 모두를 작성한다.
```javascript
try{
    var p = permutation(a); // permutation 함수는 예외를 던질 가능성이 있음
    p.forEach(function(v) { console.log(v); });
} catch(e){
    alert(e);
}
```
이 코드에서 permutation 함수가 예외를 던지면 p.forEach(...);은 실행되지 않는다. 곧장 catch 블록 안으로 실행의 흐름이 바뀐다. try/finally 문을 작성하면 try 블록에서 예외가 발생해도 예외를 잡지 않는다. 그대로 finally 블록 안으로 실행 흐름이 바뀐다. 예외가 발생하면 그 후에 프록램이 오류로 멈춘다.<br/><br/>
**예외가 여러 개 발생했을 때 대치하는 방법**<br/>
복잡한 프로그램에서는 일반적으로 다양한 유형의 예외가 발생한다. 이럴 때는 catch 블록 안에 예외 유형별로 처리를 작성해 줄 필요가 있다. 이런 상황에는 다음과 같이 instanceof 연산자로 예외 타입을 판별한다.
```javascript
try {
    // 이 지점에서 오류가 발생한다고 가정한다
} catch(e) {
    if( e instanceof TypeError ) {
        // TypeError가 발생했을 때의 처리를 작성한다
    } else if( e instanceof ReferenceError ){
        // ReferenceError가 발생했을 때의 처리를 작성한다
    } else {
        // 그 외의 예외가 발생했을 때의 처리를 작성한다
    }
}
```
**예외의 전파**<br/>
예외는 호출 스택을 거슬러 올라가며 전파된다.
```javascript
try {
    f();
} catch(e) {
    console.log("예외를 캐치함 -> " + e);
}
function f() { g(); }
function g() { h(); }
function h() { throw new Error("오류가 발생했습니다"); }
```
이 코드를 실행하면 콘솔에 다음과 같은 내용이 표시된다.
```
예외를 캐치함 -> Error: 오류가 발생했습니다
```
이 예제에서 발생한 예외는 'h -> g -> f -> 전역 코드'순서대로 호출 스택을 거슬러 올라가 전파되며, 마지막에는 전역 코드에서 try/catch 문에 걸려서 처리된다. 호출 스택에서 예외 처리기를 찾기 못하면 프로그램이 강제로 종료되며 예외는 사용자 오류로 보고된다.<br/>

**비동기 처리의 콜백 함수가 던진 예외 처리**<br/>
비동기 처리의 콜백 함수가 던진 예외는 콜백 함수를 넘긴 함수로 전파되지 않는다.
```javascript
try {
    setTimeout(function throwError() {
        throw new Error("오류가 발생했습니다");
    },1000);
} catch(e) {
    console.log("예외를 캐치함 -> " + e);
}
```
이 코드를 실행하면 콘솔에는 다음과 같은 내용이 표시된다. 그리고 예외가 캐치되지 않은 상태로 프로그램이 종료된다.
```
Uncaught Error: 오류가 발생했습니다
```
예외를 던지는 콜백 함수 throwError는 함수 정의가 try 블록 안에 있을 뿐 try 블록 안에서 호출된 것이 아니다. 이 콜백 함수를 호출한 주체는 타이머 이벤트이며 try 블록 안에서 발생한 예외가 아니다. 그래서 예외를 잡을 수 없는 것이다.<br/>

**반복문에서 빠져나오기**<br/>
'안쪽에서 예외를 던지면 그 예외는 바깥쪽에서 받아서 처리한다'라는 예외 메커니즘을 중첩 반목문처럼 깊은 반복문 안에서 탈출하는 용도로 이용할 수 있다. 예를 들어 forEach 문은 실행하는 도중에 취소할 수 없지만 예외 메커니즘을 이용하면 실행 중인 반복문에서 빠져나올 수 있다.
```javascript
var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
try {
    a.forEach(function(v,i,a) {
        if( i > 5 ){
            throw false;
        }
        return a[i] = v*v;
    });
} catch(e) {
    if(e) throw e;
}
console.log(a); // [0, 1, 4, 9, 16, 25, 6, 7, 8, 9]
```
또한 의도하지 않은 예외가 try 블록 안에서 발생하는 경우를 대비하여 예외 같이 true로 평가되었을 때는 그 예외를 밖으로 던진다. 예외 값이 false면 그다음 코드인 console.log를 실행한다.

# 12장
정규 표현식
------
**정규 표현식**(regular expression)은 문자열의 패턴을 표현하기 위한 도구이다. 정규 표현식을 사용하면 문자열 안에서 특정 패턴을 가지는 문자열을 검색/추출/치환하는 등의 고급 문자열 처리 코드를 직접 작성하지 않고도 구현할 수 있다.

정규 표현식의 생성
------
자바스크립트의 정규 표현식은 RegExp **객체**로 표현한다. 정규 표현식은 RegRxp **생성자** 또는 **정규 표현식 리터럴**로 생성할 수 있다.
```javascript
var reg = new RegExp("abc");  // RegExp 생성자로 생성
var reg = /abc/;  // 정규 표현식 리터럴로 생성
```
이 두 개의 정규 표현식은 똑같은 정규 표현식 객체를 생성한다. 위의 코드는 모두 '"abc"라는 문자열을 포함한다'라는 뜻을 가진 문자열의 패턴을 표현한 것이다. 이 "abc" 부분을 정규 표현식 패턴이라고 한다. 정규 표현식 패턴을 작성할 때는 숫자(0~9)와 알파벳(a~z,A~Z) 등의 일반 문자와 '+','.'등의 특수문자를 사용한다. 정규 표현식에서 사용하는 특수문자는 메타 문자(meta character)라고 하며, 이 메타 문자를 문자로서 사용할 때는 앞에\\문자를 붙여 주어야 한다.

패턴 매칭
------
어떤 문자열이 정규 표현식이 표현하는 문자열의 패턴을 가지고 있을 때 그 문자열을 가리켜 정규 표현식과 **일치**(Match)한다고 한다. 문자열이 정규 표현식과 일치하는지 확인하는 작업을 가리켜 **패턴 매칭**이라고 한다.

RegExp 객체의 메서드
------
자바스크립트 정규 표현식을 사용하여 문자열을 처리하려면 RegExp.prototype의 test, exec 매서드를 사용하거나 String.prototype의 match, replace, search, split 매서드를 사용한다. 이 정레서는 RegExp.prototype의 test와 exec 메서드의 간단한 사용법을 알아본다.<br/>
test 메서드는 정규 표현식 문자열이 일치하는지 뜻하는 논리값을 반환한다.
```javascript
var reg = /cat/;
console.log(reg.test("cats and dogs")); // true
console.log(reg.test("Cat"));           // false
```
exec 메서드는 정규 표현식과 일치하는 문자열을 검색하여 일치한 문자열을 배열로 반환한다. 일치하는 문자열을 찾지 못했을 때는 null을 반환한다.
```javascript
var reg = /Script/;
var result = reg.exec("JavaScript");
console.log(result[0]); // Script
```
반환된 배열에는 index와 input 프로퍼티가 있다. index 프로퍼티에는 가장 처음 일치한 위치가 들어가고 input 프로퍼티에는 일치한 문자열이 들어간다.
```javascript
console.log(result.index);  // 4
console.log(result.input);  // "JavaScript"
```

기본적인 정규 표현식 패턴 작성하기
======
이제부터 메타 문자를 사용한 기본적인 정규 표현식 패턴 작성법을 소개한다.

리터럴 문자
------
정규 표현식의 패턴이 일반 문자와 메타 문자로 구성되는데 이때 일반 문자는 리터럴 문자라고 한다. 리터럴 문자는 유티코드 문자, \n, \t 들이 있다.<br/>
다음 문자는 정규 표현식에서 특별한 뜻을 갖는 메타 문자(정규 표현식의 구문 문자)이다.<br/>
` ^ $ \ . * + ? ( ) [ ] { } | `<br/>

문자 클래스
------
**문자 클래스:[...]**<br/>
문자 클래스는 특정 문자 집합 안의 모든 단일 문자와 일치한다. 문자 클래스를 정의하려면 문자 집합의 요소가 되는 문자 리터럴을 나열하여 대괄호로 묶어 준다.
```
[abc]       // 'a', 'b', 'c' 중 문자 한개와 일치
[a-z]       // 전체 소문자 중 문자 한 개
[a-zA-Z0-9] // 모든 알파벳과 숫자 중 문자 한 개
```
**부정 문자 클래스:[^...]**<br/>
[^...]는 문자 클래스인 대괄호 안에 들어 있지 않은 단일 문자와 일치한다.
```
[^0-9]  // 숫자 이외 문자 한개와 일치
```

문자 클래스의 단축 표기
------
자주 사용되는 문자 클래스에는 다음과 같은 단축 표기법이 있다.<br/><br/>
**임의의 문자 한개 : .**<br/>
마침표(.)는 줄 바꿈 문자를 제외한 임의의 문자 한 개와 일치한다.<br/>
**숫자와 숫자 외의 문자 : \d, \D**<br/>
\d는 숫자로 해석할 수 있는 문자 한 개와 일치한다. \d는 [0123456789]의 단축 표기이다. \D는 [^0123456789]의 단축 표기이다.<br/>
**단어 문자와 단어 문자 외의 문자 : \w, \W**<br/>
\w는 모든 영어 단어 문자(알파벳, 숫자, 언더스코어)라는 뜻이다. 즉 \w는 [a-zA-A0-9_]의 단축 표기이다. \W는 영어 단어 문자가 아닌 문자와 일치한다.<br/>
**공백 문자와 공백 문자 외의 문자 : \s, \S**<br/>
\s는 모든 공백 문자(공백 문자, 탭 문자, 개행 문자 등)와 일치한다. \S는 공백 문자가 아닌 문자와 일치한다.<br/>
**문자 클래스 안에서의 이스케이프**<br/>
\\ 문자가 붙어 있는 단축 표기는 대괄호 안에 문자 클래스를 작성할 떄도 같은 뜻으로 사용할 수 있다. 예를 들어 [\s\w]는 공백 문자 한 개 또는 영어 단어 문자 중 한 개와 일치한다. 메타 문자를 문자 클래스 안에서 사용하면 메타 문자로서의 특별한 의미를 잃고 그 문자 자체를 뜻하게 된다.<br/>

반복 패턴
------
반복 패턴을 사용하면 정규 표현식의 요소를 여러번 반복하도록 지정하여 더욱 간결하게 표기할 수 있다.<br/><br/>
**최소 m번, 최대 n번 반복 : {m, n}**<br/>
```
/[a-z]{6,12}/   // 알파벳 소문자가 여섯 자 이상이며 열두 자 이하인 문자열과 일치
```
**바로 앞의 요소를 최소 n번 반복 : {n,}**<br/>
**바로 앞의 요소를 n번 반복 : {n}**<br/>
**최대 한 번 반복 : ?**<br/>
**최소 한 번 반복 : +**<br/>
**최소 0번 반복 : \***<br/>
**욕심 없는 반복 : 반복 문자 ?**<br/>

그룹화와 참조
------
**그룹화 : (...)**<br/>
정규 표현식의 패턴 요소를 소괄호로 묶으면 부분적으로 그룹화할 수 있다. 그룹화한 부분은 ?, +, * 등을 사용해서 반복할 수도 있고, |을 사용해서 선택의 범위를 좁힐 수도 있다. 그룹화 된 부분(소괄호로 묶은 부분)은 부분 정규 표현식이 된다. 이 **부분 정규 표현식**과 일치한 값은 별도로 저장되므로 나중에 그 부분을 다시 참조할 구도 있고 이렇게 일차한 값을 저장하는 동작을 가리켜 **캡처링**(저장)이라고 한다. <br/>
**캡처링 없는 그룹화 : (?:...)**<br/>
캡처링 없는 그룹화도 할 수 있다.<br/>

위치를 기준으로 매치하기
------
문자열의 위치를 패턴으로 지정하는 **앵커**라는문자가 있다.<br/>
**문자열의 시작 위치 : ^**<br/>
^은 문자열의 시작 위치에 패턴을 고정한다.<br/>
**문자열의 마지막 위치 : $**<br/>
$는 문자열의 마직막 위치에 패턴을 고정한다.<br/>
**영어 단어의 경계: \b**<br/>
/b는 영어 단어의 경계 위치화 일치한다. \b는 영어 문자의 시작 부분 또는 끝부분의 다른 문자가 없는 위치에 매칭한다.<br/>
**영어 단어 외의 위치 : \B**<br/>
/B는 영어 단어 경계 외의 위치에 일치한다.<br/>
**전방 탐색 : (?=pattern)**<br/>
x(?=y)라고 표기하면 x 다음에 y가 나오는 패턴이 된다.<br/> 
**전방 부정 탐색 : (?|pattern)**<br/>
x(?|y)라고 표기하면 x다음에 y가 나오지 않는 패턴이 된다.<br/>

선택 패턴
------
선택 패턴은 문자열 여려 개 중에서 문자열 하나와 일치한다. 선택 패턴을 정의할 때는 후보가 되는 패턴 문자열을 |로 연결해서 표기한다.

플래그
------
정규 표현식에는 고급 검색을 설정하기 위한 플래그가 다섯 개 있다. 이들 플래그는 한 개만 성정할 수도 있도 여러 개를 조합해서 설정할 수도 있다.

|플래그|뜻|
|:---:|---|
|i|대문자와 소문자를 구별하지 않는다.|
|g|전역 검색한다. 처음뿐만 아니라 일치하는 모든 것을 검색한다.|
|m|여러 줄 모드로 검색한다. 앵커 문자^과 $는 각각 행이 시작과 끝이라는 뜻이다.|
|y|시작 위치 고정 검색을 한다.|
|u|정규 표현식 패턴을 내부적으로 유니코드 코드 포인트 열로 처리한다.|

플래그를 설정하는 방법
------
정규 표현식을 RegExp 생성자로 생성할 때 플레그를 성정하려면 두 번째 인수에 플레그를 문자열로 넘긴다. 정규 표현식을 정규 표현식 리터럴로 생성할 때 를레그를 설정하려면 마지막 / 문자 뒤에 플레그를 붙여 주고 플래그 여러개를 동시에 설정하려면 플래그 문자를 나열한 문자열을 붙여준다.
```javascript
var reg1 = new RegExp("abc","g");
var reg2 = /abc/g;
var reg3 = /abc/gi;
```

패턴 매칭을 하는 문자열 메서드
======
이 절에서는 String 객체의 메서드와 정규 표현식을 함께 사용하는 방법을 배운다.

문자열 검색하기 : search 메서드
------
search 메서드는 인수로 받은 정규 표현식 객체와 일치한 최초 문자열의 첫 번째 문자 위치를 반환하고 일치하는 문자를 찾기 못했을 때는 -1을 반환한다. search 메서드는 원본 문자열을 수정하지 않는다. search 메서드는 전역 검색을 지원하지 않으므로 g플레그를 성정해도 무시한다.
```javascript
var s = "1 little,2 little indian";
console.log(s.search(/little/));    // 2 : 일치한 최초 문자열의 첫 번째 문자 위치
console.log(s.search(/\d/));        // 0 : 일치한 최초 문자열의 첫 번째 문자 위치
console.log(s.search(/\bindian/));  // 18 : 일치한 i의 위치
console.log(s.search(/3\s/));       // -1 : 일치하지 않음
```

문자열 치환하기 : replace 메서드
------
**replace 메서드의 기본적인 사용법**<br/>
replace 메서드는 첫 번째 인수로 받은 정규 표현식과 일치하는 문자열을 검색하고, 두 번째 인수로 받은 문자열로 치환한 새로운 문자열을 반환한다. replace 메서드는 원본 문자열을 고치지 않는다. 정규 표현식에 g 플레그를 설정하면 일치한 문자열을 모두 치환한다. g 플레그를 설정하지 않으면 가장 처음 일치한 문자열만 치환한다.
```javascript
var s = "1 little,2 little indian";
console.log(s.replace(/indian/,"boy")); // 1 little,2 little boy
console.log(s.replace(/little/,"big")); // 1 big,2 little indian
console.log(s.replace(/little/g,"big")); // 1 big,2 big indian
```
**치환 패턴 : $n, $&**<br/>
두 번째 인수인 대체 문자열에는 특수한 치환 패턴인 $n, $&을 사용할 수 있다.<br/>
①$n에는 정규 표현식 안에 소괄호를 사용하여 그룹화한 n번째 부분 정규 표현식과 일치한 문자열이 들어가며, n에는 0~9999 사이의 값을 넣을 수 있다.
```javascript
var person = "Tom, tom@example.com, 010-1234-5678";
var date = "오늘은 2016년9월10일 입니다.";
var name = "Tom Sawyer";
var result1 = person.replcae(/0(\d{1,4}-\d{1,4}-\d{4})/g),"+82-$1");
var result2 = date.replace(/(\d+)년(\d+)월(\d+)일/,"$1/$2/$3");
var result3 = name.replace(/(\w+)\s(\w+)/,"$2 $1");
console.log(result1); // Tom, tom@example.com, +82-10-1234-5678
console.log(result2); // 오늘은 2016/9/10 입니다.
console.log(result3); // Sawyer Tom
```
②$&에는 일치한 부분 문자열이 들어온다.
```javascript
var address = "121-842 서울특별시 마포구 월드컵로10길 56";
var result = address.replace(/\d{3}-\d{3}/,"ⓐ$&");
console.log(result);  // ⓐ121-842 서울특별시 마포구 월드컵로10길 56
```

**문자열 치환을 처리하는 함수**<br/>
두 번째 인수에함수를 넘길 수도 있다.<br/>

|함수|뜻|
|:---:|---|
|match|일차한 부분 문자열($&과 같은 값)|
|groupn|n 번째 부분 정규 표현식과 일치한 부분 문자열($n과 같은 값)|
|offset|일치한 부분 문자열의 첫 번째 문자 위치|
|inputStr|원본 문자열 전체|

문자열 추출하기 : match 메서드
------
match 메서드는 첫 번째 인수로 받은 정규 표현식과 일치하는 문자열을 순서대로 저장해서 배열로 반환한다. 정규 표현식에 g 플레그를 설정하지 않으면 가장 처음 일치한 문자열만 반환한다.
```javascript
"1 little,2 little indian".match(/\d+/g); // ["1", "2"]
```

문자열 나누기 : split 메서드
------
**split 메서드의 기본적인 사용법**<br/>
split 메서드는 첫 번째 인수로 문자열을 분할한 다음에 배열에 담아서 반환한다. 첫 번째 인수로는 문자열 또는 정규 표현식 객체를 넘긴다. 첫 번째 인수를 생략하면 원본 문자열 전체를 배열에 담아서 반환한다.
```javascript
console.log("172.20.51.65".split(".")); // ["127", "20", "51", "65"]
```
**반환할 문자열의 개수 제한하기**<br/>
split 메서드의 두 번째 인수는 선택 사항이다. 두 번쨰 인수로는 반환할 문자열의 개수를 제한할 수 있다.
```javascript
console.log("1, 2, 3, 4, 5".split(/\s*,\s*/,3));  // ["1", "2", "3"]
```

RegExp 객체
======
이 절에서는 RegExp 객체의 프로퍼티와 메서드를 사용해서 문자열을 처리하는 방법을 배운다.

RegExp 객체의 프로퍼티
------
RegExp 객체는 RegExp.prototype에서 프로퍼티와 메서드를 상속받는다.

|프로퍼티|설명|
|:---:|---|
|source|정규 표현식 패턴 문자열을 저장한다.|
|global|g 플레그가 사용되고 있는지를 뜻하는 논리값. 읽기 전용|
|ignoreCase|i 플레그가 사용되고 있는지를 뜻하는 논리값. 읽기 전용|
|multiline|m 플레그가 사용되고 있는지를 뜻하는 논리값. 읽기 전용|

RegExp의 메서드
------
RegExp는 test와 exec 두 개의 메서드를 가지고 있다.<br/>
**exec 메서드의 반환값**<br/>
exec 메서드는 정규 표현식과 일치하는 문자열을 검색해서 일치한 문자열과 부분 정규 표현식에 일치한 문자열을 배열에 담아 반환한다. 일치하는 문자열을 찾지 못했을 때는 null을 반환한다.<br/>
**lastIndex 프로퍼티**<br/>
g 플래그를 설정한 정규 표현식으로 exec나 test 메서드를 실행하면 일치한 문자열 바로 다음 번 문자의 위치가 정규 표현식 객체의 lastIndex 프로퍼티에 저장된다. 일치하지 않을 때는 0이 저장된다. 같은 정규 표현식 객테로 다시 한 번 exec나 test메서드를 호출하면 lastIndex 프로퍼티가 가리키는 문자의 위치에서 검색을 재개한다.
```javascript
var tel = /(\d{2,5})-(\d{1,4})-(\d{4})/g;
var test = "Tom: 010-1234-5678\nHuck: 020-550-7809\nBecky: 030-4321-9876";
console.log(tel.lastIndex);   // 0
console.log(tel.exec(test));  // ["010-1234-5678", "010", "1234", "5678"]
console.log(tel.lastIndex);   // 18
console.log(tel.exec(test));  // ["020-550-7809", "020", "550", "7809"]
```
g 플래그를 설정한 정규 표현식 객체의 exec 메서드를 계속 호출하면 일치한 문자열을 순서대로 구할 수 있다. 이 성질을 활용하면 exec 메서드를 반복 호출해서 정규 표현식과 일치한 문자열의 모든 매칭 정보를 구할 수 있다. 정규 표현식이 반환한 값 안의 lastIndex 프로퍼티는 수정할 수 있다. 따아서 값을 설정해서 원하는 문자의 위치에서 검색을 시작할 수 있다.

ECMAScript 6부터 추가된 정규 표현식의 새로운 기능
======
u 플래그
------
ECMAScript 6부터 추가된 u 플래그를 설정하면 문자열을 유니코드 코드 포인트 열로 처리한다.

y 플래그
------
y 플래그를 설정하면 **시작 위치 고정 검색**을 할 수 있다. 이를 활용하면 정규 표현식 객체의 lastIndex 프로퍼티의 인덱스가 가리키는 그 위치부터 검색을 시작할 수 있다.

flags 프로퍼티
------
ECMAScipt 6부터는 flags 프로퍼티로 플래그 문자열을 쉽게 확인할 수 있다.

RegExp의 인수로 정규 표현식을 넘겼을 때의 동작
------
RegExp 생성자의 첫 번째 인수로 정규 표현식 객체를 넘기면 객체와 같은 패턴을 지닌 정규 표현식 객체가 생성된다. ECMAScipt 6부터는 두 번째 인수로 플래그를 넘겨서 원본 정규 표현식 객체와는 다른 플래그를 사용하도록 할 수 있다.