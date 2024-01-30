const apiKey ='4c2d201c758b4664ab2eeaa863a7bbee'
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
let newsList=[]

const getNews = async()=>{
    const url2 = new URL(url);
    const response = await fetch(url2);
    const data = await response.json()
    newsList = data.articles;
    render();
    console.log(newsList)
}


const render=()=>{    
    const newsHTML = newsList.map(news => 
        `<div class="row item">
            <div class="col-lg-4">
                        <img src=${news.urlToImage}  />
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
    document.querySelector('#news-board').appendChild(newsHTML);
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



