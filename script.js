const apiKey ='4c2d201c758b4664ab2eeaa863a7bbee'
let country = 'kr'
let url = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apiKey}`;
let url2 = `http://13.124.2.62:8080/api/news`
let newsList=[]
const replaceImage ="noonatimes2.png";
let totalResults = 34;
let page =1
const pageSize =10 // 한페이지에 보여질 item갯수
const groupSize =5
let lastPage;
let firstPage;
let prevStatus = "disabled";
let nextStatus = '';

let firstItem;


const menus = document.querySelectorAll('.menus button')
menus.forEach(button => addEventListener('click', onMenuClick))
console.log(menus)

const input = document.querySelector('.search-input')
// 이벤트 전파로 인해서 input을 enter로 하면... 막아지지 않고 오류난다.
// input.addEventListener('keyup', function(event){  //input enter에 search 기능 추가
    
//     if (event.key == 'Enter'){
//         const keyword = input.value;
//         input.value =''
//         event.stopPropagation()
//         const country = checkInput(keyword);
//         url = `https://newsapi.org/v2/top-headlines?country=${country}&q=${keyword}&apiKey=${apiKey}`    
//         getNews();
//     }
// })

function changeCountry(){
    const countryTag = document.querySelector('.country')
    if (countryTag.innerText == '한국기사 → 영어기사'){
        countryTag.innerText = '영어기사 → 한국기사';
        country ='us'
        
    } else if(countryTag.innerText == '영어기사 → 한국기사'){
        //! 그냥 else라고 하면 불분명하다. 그밖의 다른 것은,
        // 아닌것 모두
        countryTag.innerText = '한국기사 → 영어기사';
        country ='kr'
    }
}


document.getElementById('news-board').addEventListener('click', function(event) {
    event.stopPropagation(); // 이벤트 전파 중지
});

async function onMenuClick(e){
    const category = e.target.id
    //혹은 e.target.textContent.toLowerCase();
    url =`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
    await getNews();
}
async function search(){
    // const input = document.querySelector('.search-input') //전역변수
    const keyword = input.value;
    input.value =''
    country = checkInput(keyword);
    url = `https://newsapi.org/v2/top-headlines?country=${country}&q=${keyword}&apiKey=${apiKey}`    
    await getNews()
}

function checkInput(word){
     // 정규 표현식을 사용하여 한글/영문 여부를 판별
    var isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(word);
    var isEnglish = /^[a-zA-Z]+$/.test(word);
    if(isKorean) {
        country = 'kr';
        console.log(country);
        return 'kr';
    }
    if(isEnglish) {
        country = 'us';
        console.log(country)
        return 'us';
    }
}

// async function getNews(){
//     const newsUrl = new URL(url);
//     newsUrl.searchParams.set("page",page)  // &page=page
//     newsUrl.searchParams.set("pageSize",pageSize) //&pageSize=pageSize
//     try{
//         const response = await fetch(url2);   //너무 많이 이용해서 블록당해서 하루 정도 쉰다.
//         const data = await response.json()
//          if (response.status == 200){
//             console.log('data : ', data);
//             if(data.articles.length == 0){
//                 console.log('아티클길이', data.articles.length)
//                 throw new Error('No result for this search');
//             }
//              newsList = data.articles;
//              totalResults = data.totalResults;

//              if (country == 'kr'){
//                  firstItem = {
//                      title: '여신의 품격: Ive 장원영 vs 코딩누나',
//                      description: "<h5>코딩 알려주는 누나와 쌍벽을 이루는 미모</br>코딩누나 긴장 좀 해야 겠다!! </h5>",
//                      url: 'https://cdn.inflearn.com/public/users/thumbnails/694277/60d324e4-719f-4551-8f3c-f377b7eb1f78',
//                      urlToImage: `https://truth.bahamut.com.tw/s01/202209/bb7dd87e8f4d1d0ca3a7d735f873eb38.JPG`,
//                      publishedAt: '2024.01.30',
//                      source: {name: 'Noona Times'}
//                  }
//              } else{
//                 firstItem = {
//                      title: 'Grace of goddess: Ive Jang wongyong vs Coding noona.',
//                      description: "<h5>A perfect pair in beauty along with Coding noona</br>Coding noona! You should not let your guard down!!</h5>",
//                      url: 'https://cdn.inflearn.com/public/users/thumbnails/694277/60d324e4-719f-4551-8f3c-f377b7eb1f78',
//                      urlToImage: `https://truth.bahamut.com.tw/s01/202209/bb7dd87e8f4d1d0ca3a7d735f873eb38.JPG`,
//                      publishedAt: '2024.01.30',
//                      source: {name: 'Noona Times'}
//                  }
//              }
//              newsList = [firstItem, ...newsList]
//              render();
//             //  pagiNationRender()   이것을 render()안으로 넣자.
//              console.log(newsList)
//          } else{
//             throw new Error(data.message)
//          }

//     } catch(e){
//         console.log(e.message)
//         errorRender(e.message)
//     }
    
// }


function render(){
    const newsBoard = document.querySelector('#news-board')
    newsBoard.innerHTML =''; //비우고 시작

    const newsHTML = newsList.map(news => 
        `<div class="row item">
            <div class="col-lg-4">
                        <img src=${news.urlToImage?? replaceImage}  />
                    </div>
                    <div class="col-lg-8">
                        <h2 class='title' onclick="getDetail('${news.url}')">${news.title}</h2>
                        <p>${news.description}</p>
                        <div>
                            ${news.source.name} : ${news.publishedAt} 
                        </div>
                    </div>
            </div>
        </div>
    `).join('')
    newsBoard.innerHTML = newsHTML;
    pagiNationRender(); 
}

function getDetail(url){
     window.location.href = url;
}

function errorRender(message){
    const newsBoard = document.querySelector('#news-board')
    newsBoard.innerHTML ='';
    const errorHTML = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;
    newsBoard.innerHTML= errorHTML;

    // pagiNation도 안보이게 한다.(삭제하지 않으면 기존모양 그대로 나온다.)
    document.querySelector('.pagination').innerHTML = ""
}

function pagiNationRender(){
    const totalPage = Math.ceil(totalResults / pageSize)
    const pageGroup = Math.ceil(page /groupSize)
    lastPage = pageGroup * groupSize
    
    firstPage = lastPage - groupSize +1
    if (lastPage > totalPage){
        lastPage = totalPage
    }
    if (firstPage == lastPage){
        nextStatus = 'disabled'
    }
    
    let paginationHTML =`<li class="page-item prev ${prevStatus}"><div class="page-link" onclick="moveToPage(${firstPage})"><<</div></li><li class="page-item prev ${prevStatus}"><div class="page-link" onclick="moveToPage(${page-1})">Previous</div></li>`;
    // page가 전역변수라서 page-1 이 최신페이지에서 이전페이지가 된다.
    
    for (let i=firstPage; i<=lastPage; i++){
        paginationHTML += `<li class="page-item" onclick="moveToPage(${i})" ><div class="page-link ${i==page ? 'active' : ''}" href="#">${i}</div></li>`
    }

    paginationHTML += `<li class="page-item next ${nextStatus}"><div class="page-link" onclick="moveToPage(${page+1})">Next</div></li><li class="page-item next ${nextStatus}"><div class="page-link" onclick="moveToPage(${lastPage})">>></div></li>`

    document.querySelector('.pagination').innerHTML = paginationHTML;

}

async function moveToPage(pageNo){    
    const prevs = document.querySelectorAll('.prev')
    const nexts = document.querySelectorAll('.next')

    if (pageNo >= firstPage && pageNo <= lastPage){
        page = pageNo;
        if (page > firstPage ){  
            prevStatus ='' 
        } else {
            prevStatus ='disabled'
        }
        if (page < lastPage){
            nextStatus =''
        } else{
            nextStatus ='disabled'
        }
        
        
    } else {
        return;
    }
    // url = url+`&pageSize=${pageSize}&page=${page}`
    // 위에서 URL.searchParams.set()을 사용하므로 여기서는 주석
    await getNews()  // getNews에 paginationRender()가 포함되어 있다.

}


// getNews();


async function getNews2(){
    const newsUrl = new URL(url2);
    newsUrl.searchParams.set("page",page)  // &page=page
    newsUrl.searchParams.set("pageSize",pageSize) //&pageSize=pageSize
    try{
        const response = await fetch(url2);   //너무 많이 이용해서 블록당해서 하루 정도 쉰다.
        const data = await response.json()
        console.log('data: ', data)  
        // [
        //    {status: 'ok', totalResults: 37, articles: Array(37)},
        //    {status: 'ok', totalResults: 37, articles: Array(3)}
        //]
         if (response.status == 200){
            console.log('data : ', data);
            if(data[0].articles.length == 0){                
                throw new Error('No result for this search');
            }
             newsList = data[0].articles;
             const newsListLength = newsList.length;

             for(i=1; i<newsListLength+1; i++){
                let list =[]
                if(i %10 != 0 ){
                    list.push(newsList[i-1])
                } 
                newsList.push(list);
                list =[]
                if (i%)
             }
             totalResults = data[0].totalResults;
             render();
            //  pagiNationRender()   이것을 render()안으로 넣자.
             console.log(newsList)
         } else{
            throw new Error('예상 못한 에러를 만났습니다.')
         }

    } catch(e){
        console.log(e.message)
        errorRender(e.message)
    }
    
}

getNews2();





// async function getNews3(){
//     const newsUrl = new URL(url2);
//     newsUrl.searchParams.set("page",page)  // &page=page
//     newsUrl.searchParams.set("pageSize",pageSize) //&pageSize=pageSize
//     try{
//         const response = await fetch(url2);   //너무 많이 이용해서 블록당해서 하루 정도 쉰다.
//         const data = await response.json()
//         console.log('data: ', data)  
//         // [
//         //    {status: 'ok', totalResults: 37, articles: Array(37)},
//         //    {status: 'ok', totalResults: 37, articles: Array(3)}
//         //]
//          if (response.status == 200){
//             console.log('data : ', data);
//             if(data[1].articles.length == 0){                
//                 throw new Error('No result for this search');
//             }
//              newsList = data[1].articles;
//              totalResults = data[1].totalResults;
//              render();
//             //  pagiNationRender()   이것을 render()안으로 넣자.
//              console.log(newsList)
//          } else{
//             throw new Error('예상 못한 에러를 만났습니다.')
//          }

//     } catch(e){
//         console.log(e.message)
//         errorRender(e.message)
//     }
    
// }

// getNews3();



