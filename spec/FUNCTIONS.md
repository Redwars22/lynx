# 🧲 FUNCTIONS

You can define a function and/or a procedure with the `fun` keyword followed by the name of the function. Functions can have return values and can receive arguments. They can also be called wherever in the code you need to call it.

## #️⃣ RETURN VALUES

Functions can return values to be used elsewhere. One example is a function that calculates the Einstein’s formula `E=m.c²` and returns its result to be stored in a variable. They can return a value by using the `ret` keyword followed by the value you want to return.

```tsx
fun getEnergy(mass, lightSpeed) {
	ret mass * math.pow(lightSpeed, 2);
}
```

You can also have procedures, where no value is returned. Using `ret` without a return value will simply jump out of the procedure.

```tsx
fun alert(msg) {
	ret;
}
```

## 🧲 CALLING FUNCTIONS

To call a function anywhere in your code, you can use this syntax: `function()` or `function(arg1, arg2, arg3, etc...)` if it receives one or more parameters.

## 🔧 PARAMETERS

Functions can and will often receive parameters. A default value can also be defined by using the `=` assigning symbol. In the case of `searchUser(email, id = "null")`, if `id` is not passed to the function, it will automatically receive the string value “null”.

```tsx
fun searchUser(email, id = "null") {
	if email or not id == "null" {
		const user = database.search(id, email);
		ret user;
	}
	
	ret DEFAULT_USER;
}

searchUser(email);
```

