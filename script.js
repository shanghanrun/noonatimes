let newsList=[
    {
        "source": {
            "id": "",
            "name": "Noona Times"
        },
         "author": "초코",
            "title": "여신의 품격: 장원영(Ive) vs 코딩누나(코눈)",
            "description": "<h5>장원영, 코딩 알려주는 누나와 쌍벽을 이루는 미모</br>'아이즈원'으로 혜성처럼 데뷰해서 꾸준한 인기를 얻어가던 장원영은 새로운 그룹 'Ive'의 리더로 활동하며 글로벌 명성을 이어가고 있다. 한편 코딩계에서 별똥별처럼 반짝이며 등장한 김빛나씨는 미모 뿐만 아니라 뛰어난 실력 및 유머로 챗지피티에게 소문이 날 정도이다. 이 둘의 대결이 어떻게 될 지 흥미진진하다. 코딩누나 살짝 긴장 좀 해야 겠다!! </h5>",
        "url": "https://cdn.inflearn.com/public/users/thumbnails/694277/60d324e4-719f-4551-8f3c-f377b7eb1f78",
        "urlToImage": "https://truth.bahamut.com.tw/s01/202209/bb7dd87e8f4d1d0ca3a7d735f873eb38.JPG",
        "publishedAt": "2024.01.30",
        "content": ""
    },
]
const replaceImage = 'noonatimes.png'


function render(){
    const newsBoard = document.querySelector('#news-board')
    newsBoard.innerHTML =''; //비우고 시작

    const newsHTML = newsList.map(news => 
        `<div class="row item">
            <div class="col-lg-4">
                        <img src=${news.urlToImage || replaceImage}  />
                    </div>
                    <div class="col-lg-8">
                        <h2 class='title' onclick="getDetail('${news.url}')">${news.title}</h2>
                        <p>${news.content || news.description}</p>
                        <div>
                            ${news.source.name} : ${news.publishedAt} 
                        </div>
                    </div>
            </div>
        </div>
    `).join('')
    newsBoard.innerHTML = newsHTML;
}



function handleFileInput(event){
    const file = event.target.files[0];
    if(file){
        const reader = new FileReader();
    
        // 2. 파일을 읽어온 후 실행되는 함수
        reader.onload = (e) => {
            const contents = e.target.result;
            const data = JSON.parse(contents)
            console.log('data: ', data)
            console.log('data.status: ', data.status)
            console.log('data.totalResults: ', data.totalResults)
            
            newsList = data.articles
            console.log('newsList :', newsList)

            render();
            
            // 여기서 파일 내용을 가지고 원하는 작업을 수행할 수 있습니다.
        };
        // 1. 파일을 읽어온다. (비동기)
        reader.readAsText(file);
    } else{
        console.log('파일을 선택하지 않았습니다.')
    }
}

render()
