'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!', event);

    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
    const activeArticles = document.querySelectorAll('.post.active');
    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector', articleSelector);
    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle', targetArticle);
    targetArticle.classList.add('active');
    console.log('targetArticle:', targetArticle);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
    const titleList = document.querySelectorAll(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList)
  /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId', articleId);
    /* find the title element */
    
    
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML', linkHTML);
    html = html + linkHTML;
    }
    /* insert link into titleList */
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    console.log(links);
    for(let link of links){
    link.addEventListener('click', titleClickHandler);
    }
}
generateTitleLinks();