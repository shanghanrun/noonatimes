const apiKey ='4c2d201c758b4664ab2eeaa863a7bbee'
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
let newsList=[]
const replaceImage ="noonatimes2.png";

const menus = document.querySelectorAll('.menus button')
menus.forEach(button => addEventListener('click', onClick))
console.log(menus)

function onClick(e){
    console.log('clicked')
    const category = e.target.id
    //혹은 e.target.textContent.toLowerCase();
    const url =`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
    getNews(url);
}


const getNews = async(url)=>{
    const url2 = new URL(url);
    const response = await fetch(url2);
    const data = await response.json()
    newsList = data.articles;
    const firstItem = {
        title: '여신의 품격: Ive 장원영',
        content: "<h5>코딩 알려주는 누나와 쌍벽을 이루는 미모</br>코딩누나 긴장 좀 해야 겠다!! \u{1FAE2} </h5>",
        urlToImage: `https://truth.bahamut.com.tw/s01/202209/bb7dd87e8f4d1d0ca3a7d735f873eb38.JPG`,
        publishedAt: '2024.01.30',
        source: {name: 'Noona Times'}
    }
    newsList = [firstItem, ...newsList]
    render();
    console.log(newsList)
    
}


const render=()=>{
    const newsBoard = document.querySelector('#news-board')
    newsBoard.innerHTML =''; //비우고 시작

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
    `).join('')
    newsBoard.innerHTML = newsHTML;    
}


getNews(url);



