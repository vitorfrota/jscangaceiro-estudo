export function debounce(fn, ms){
    let timer = 0;

    return () => {
        clearTimeout(timer);

        timer = setTimeout(()=> fn(), ms)
    }
}