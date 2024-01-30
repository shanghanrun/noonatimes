const apiKey ='4c2d201c758b4664ab2eeaa863a7bbee'
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
let newsList=[]
const replaceImage ="noonatimes2.png"
const mention ="<h5>코딩 알려주는 누나와 쌍벽을 이루는 미모</br>코딩누나 긴장 좀 해야 겠다!! \u{1FAE2} </h5>"

const getNews = async()=>{
    const url2 = new URL(url);
    const response = await fetch(url2);
    const data = await response.json()
    newsList = data.articles;
    const firstItem = {
        title: '여신의 품격: Ive 장원영',
        content: mention,
        urlToImage: `https://truth.bahamut.com.tw/s01/202209/bb7dd87e8f4d1d0ca3a7d735f873eb38.JPG`,
        publishedAt: '2024.01.30',
        source: {name: 'Noona Times'}
    }
    newsList = [firstItem, ...newsList]
    render();
    console.log(newsList)
}


const render=()=>{    
    const newsHTML = newsList.map(news => 
        `<div class="row item">
            <div class="col-lg-4">
                        <img src=${news.urlToImage?? replaceImage}  />
                    </div>
                    <div class="col-lg-8">
                        <h2>${news.title}</h2>
                        <p>${news.content}</p>
                        <div>
                            ${news.source.name} : ${news.publishedAt} 
                        </div>
                    </div>
            </div>
        </div>
    `)
    document.querySelector('#news-board').innerHTML = newsHTML;
    // newsList.forEach( news => {
    //     let newsDiv = document.createElement('div');
    //     newsDiv.classList.add('row', 'item');
    //     newsDiv= `
    //             <div class="col-lg-4">
    //                 <img src=${news.urlToImage}  />
    //             </div>
    //             <div class="col-lg-8">
    //                 <h2>${news.title}</h2>
    //                 <p>${news.content}</p>
    //                 <div>
    //                     ${news.source.name} : ${news.publishedAt} 
    //                 </div>
    //             </div>
    //     `;
    //     document.querySelector('#news-board').innerHTML = newsDiv;
    // })
    
}


getNews();



