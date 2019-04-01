const nodejieba = require('nodejieba');
const csv       = require('csv-parser');
const fs        = require('fs');

// 没有主动调用nodejieba.load载入词典的时候，
// 会在第一次调用cut或者其他需要词典的函数时，自动载入默认词典。
// 词典只会被加载一次。
// result = nodejieba.tag(sentence);
// console.log(result);


const NEWS_FILENAME = './data/（精简版）威锋——新闻数据20180101-20190326.csv';
const newsColumns   = {
  title: '标题',
  createdTime: '发表时间',
  replyCount: '回复数',
  browseCount: '浏览量',
};


const newsRows = [];

fs.createReadStream(NEWS_FILENAME)
  .pipe(csv())
  .on('headers', (headers) => {
    console.log(`First header: `, headers);
  })
  .on('data', (data) => {
    newsRows.push(data);;
    const result = nodejieba.tag(data[newsColumns.title]);
    console.log(result);
  })
  .on('end', () => {
    console.log(newsRows);
  });


// const POST_FILENAME = './data/（精简版）威锋——帖子数据20180101-20190326.csv';
// const postRows = [];
// fs.createReadStream(POST_FILENAME)
//   .pipe(csv())
//   .on('headers', (headers) => {
//     console.log(`First header: `, headers);
//   })
//   .on('data', (data) => postRows.push(data))
//   .on('end', () => {
//     console.log(postRows.length);
//   });
