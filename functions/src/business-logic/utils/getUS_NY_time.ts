const getUS_NYTime = () => {
    return new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
}

export {getUS_NYTime};