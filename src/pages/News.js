import ProductApi from "../api/ProductApi";

const News={
   async render(){
        const {data : news} = await ProductApi.getAllNews();
        return `
        
       ${ news.map(news =>{
        return `

        <div class="container">
         <section>
        <div class="d-flex flex-row bd-highlight mb-3">
            <div class="p-2 bd-highlight"></div>
            <div class="p-2 bd-highlight">
                <a href="" style="text-decoration: none; color: black;"> Trang Chủ  / </a></div>
            <div class="p-2 bd-highlight">
                <a href="" style="text-decoration: none; color: black;"> News</a></div>
        </div>
    </section> 
        <div class="d-flex flex-row bd-highlight mb-3">
        <div class="p-2 bd-highlight"><img width="100%" src="${news.image}" alt=""></div>
        <div class="p-2 bd-highlight">
            <p>
                <a href="" style="font-size: 20px; color: #0f8fd0;text-decoration: none; ">${news.title}</a>
            </p>
            <span>${news.content}</span>
        </div>
    </div>
        </div>
        `
    })}
        
        `
        
        
    }
};
export default News;