# 📚 LIBRARIES

All JavaScript libraries such as Math and Date are readily supported in Lynx.

## 🧩 IMPORTS

JavaScript modules can be imported into Lynx files with the `import` keyword.

```tsx
import { Rectangle } from "rectangle.js";

std.print(Rectangle.getArea(12.5, 6.16));
```

## ⌨️ STANDARD LIBRARY

The standard library comes with a few input and output methods.

| `std.print(arg)` | writes a value to the console |
| `std.printLn(arg)` | writes a value to the console with a new line at the end |
| `std.clear()` | clears the output |
| `std.input()` | returns a string value from the input of the user |
| `std.nextString()` | returns a string value from the input of the user |
| `std.nextInt()` | returns an integer value from the input of the user|
| `std.nextFloat()` | returns a float value from the input of the user |
| `std.nextDouble()` | returns a double value from the input of the user |
| --- | --- |