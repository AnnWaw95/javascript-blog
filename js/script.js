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
  const activeArticles = document.querySelectorAll('.post.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');

}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleDishesSelector = '.post-dish',
  optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
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

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  console.log('generateTags');
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
  /* START LOOP: for every article: */
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
      /* add generated code to html variable */
      html = html + tagLinkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag]= 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    const links = article.querySelectorAll('.tags');
    console.log(links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
    /* END LOOP: for every article: */
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags .list');
    /*[NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    /* [NEW] start LOOP: for each tags in alltags: */
    for(let tag in allTags){
      /*[NEW] generate code of a link and add it to allTagsHTML: */
      allTagsHTML += tag + '(' + allTags[tag] + ')';
    }
    /* [NEW] add HML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  for(let activeTag of activeTags){
  /* START LOOP: for each active tag link */

    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let tagLinkHref of tagLinksHref){
    /* add class active */
    tagLinkHref.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log(allLinksToTags);
  /* START LOOP: for each link */
  for(let link of allLinksToTags){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateDishes(){
  console.log('generateDishes');
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
  /* START LOOP: for every article: */
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleDishesSelector);
    console.log(titleList);
    /* make html variable with empty string */
    let html = '';
    /* get dishes from data-tags attribute */
    const dishTags = article.getAttribute('data-dish');
    /* generate HTML of the link */
    const dishLinkHTML = '<li><a href="#dish-' + dishTags + '"><span>' + dishTags + '</span></a></li>';
    console.log('dishLinkHTML', dishLinkHTML);
    /* add generated code to html variable */
    html = html + dishLinkHTML;
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    const links = article.querySelectorAll('.post-dish');
    console.log(links);
  //   for(let dish of dishes){
  //     links.addEventListener('click', dishClickHandler);
  //   }
  // /* END LOOP: for every article: */
  }
}
generateDishes();

function dishClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Dish was clicked!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#dish-', '');
  /* find all tag links with class active */
  const dishLinks = document.querySelectorAll('a.active[href^="#dish-"]');
  for(let dishLink of dishLinks){
  /* START LOOP: for each active tag link */

    /* remove class active */
    dishLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const dishLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let dishLinkHref of dishLinksHref){
    /* add class active */
    dishLinkHref.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-dish="' + tag + '"]');
}

function addClickListenersToDishes(){
  /* find all links to tags */
  const allLinksToDishes = document.querySelectorAll('a[href^="#dish-"]');
  console.log(allLinksToDishes);
  /* START LOOP: for each link */
  for(let link of allLinksToDishes){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', dishClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToDishes();

