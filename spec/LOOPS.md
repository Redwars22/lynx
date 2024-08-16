# 🔁 LOOPS

`while` introduces a loop that will be executed until the condition provided evaluates to false. If you add the keyword `do` after the condition, then the block of code will execute at least once, regardless of whether the condition is met. `exit` exits prematurely from a loop whenever you need to, whereas `jump` jumps straight to the next iteration.

```tsx
let i = 0;

while i < users.length {
	//will print the value
	//if the condition is true
	std.printLn(users[i].name);
	i++;
}
```

```tsx
let i = 10;

while i < 10 do {
	//will print the value
	//at least once
	std.printLn(i);
	i++;
}
```
