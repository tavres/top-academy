import { memo, useState, useMemo } from 'react'

function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key,result);
        return result;
    }
}

function fibonachi(n, memo={}) {
    if (n in memo) {console.log(n);return memo[n];}
    if (n <= 1) return 1;
    memo[n] = fibonachi(n-1, memo) + fibonachi(n - 2, memo);
    return memo[n];
}

const MyComponent = ({ value }) => {
    console.log('Rendring');
    return <div>{value}</div>
}

const MemoizedComponent = memo(MyComponent);

const Child = memo(({ children }) => {
    console.log('Child component rendred');
    return <div>{children}</div>;
});

const Parent = () => {
    const [count,setCount] = useState(0);
    const [text, setText] = useState('');
    
    const stableChild = useMemo(() => <span>Memo text</span>,[]);
    
    return (
        <>
            <Child>
                {stableChild}
            </Child>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
            <button onClick={() => setCount(count + 1)}>Increment {count}</button>
        </>
    )
}

function App() {
	return (
		<>
			<h1>Hello, React!</h1>
            <Parent />
        </>
	)
}

export default App
