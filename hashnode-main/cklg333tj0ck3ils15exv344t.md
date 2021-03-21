## 随机生成区间N个不重复的数

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div></div>
    <script>
        function randoms(min,max,rest){
        var arr = []
        while (true) {
            var isExit = false
            var random = Math.round(Math.random() * (max - min) + min)
            for (var i = 0; i < arr.length; i++) {
                if (random == arr[i]) {
                    isExit = true
                    break 
                }
            }
            if (!isExit) {
                arr.push(random)
            }
            if (arr.length === rest) {
                break
            }
        }
        console.log(arr)
    }
      randoms(20,1,15)
    </script>
</body>
</html>
``` 
