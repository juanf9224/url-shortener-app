

const shortenUrl = (url: string) => {
    let hash;
    hash = Math.random().toString(32).substr(1,5);
    return hash;
}

export default shortenUrl;