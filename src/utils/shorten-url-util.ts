
// Shorten url logic
const shortenUrl = (url: string) => {
    let hash= Math.random().toString(32).substr(1,3) + (Math.random() * url.length).toString(32).substr(1, 5);
    return hash;
}

export default shortenUrl;