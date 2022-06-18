const Tesseract = require('tesseract.js');
const {
    createWorker
} = Tesseract;
const worker = createWorker();

new Promise(async (resolve) => {
    console.log('here')
    await worker.load();  // 加载
    await worker.loadLanguage('eng');  // 加载英文的语言包
    await worker.initialize('eng');  // 加载英文的语言包
    const {
        data: {
            text
        }
    } = await worker.recognize('./img(en).png');  //需要解析的图片
    console.log(text);
    await worker.terminate();

});


