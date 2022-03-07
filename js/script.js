'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  dishLink: Handlebars.compile(document.querySelector('#template-dish-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  dishCloudLink: Handlebars.compile(document.querySelector('#template-dish-cloud-link').innerHTML),
};

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
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optDishesListSelector = '.dishes';

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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagsParams(tags) {
  const params = {max: 0, min: 999999};
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}
function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
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
      const tagLinkHTMLData = {id: tag, title: tag};
      const tagLinkHTML = templates.tagLink(tagLinkHTMLData);
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
    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    /*[NEW] create variable for all links HTML code */
    const allTagsData = {tags: []};
    /* [NEW] start LOOP: for each tags in alltags: */
    for(let tag in allTags){
      /*[NEW] generate code of a link and add it to allTagsHTML: */
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /* [NEW] add HML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
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
  /* START LOOP: for each link */
  for(let link of allLinksToTags){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function calculateDishParams(dishes) {
  const dishParams = {max: 0, min: 999999};
  for(let dish in dishes){
    console.log(dish + ' is used ' + dishes[dish] + ' times');
    if(dishes[dish] > dishParams.max){
      dishParams.max = dishes[dish];
    }
    if(dishes[dish] < dishParams.min){
      dishParams.min = dishes[dish];
    }
  }
  return dishParams;
}

// function calculateDishClass(count, params){
//   const normalizedCount = count - params.min;
//   const normalizedMax = params.max - params.min;
//   const percentage = normalizedCount / normalizedMax;
//   const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
//   return optCloudClassPrefix + classNumber;
// }

function generateDishes(){
  let allDishes = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
  /* START LOOP: for every article: */
    /* find tags wrapper */
    const titleList = article.querySelector( optArticleDishesSelector);
    /* make html variable with empty string */
    let html = '';
    /* get dishes from data-tags attribute */
    const dishTags = article.getAttribute('data-dish');
    /* generate HTML of the link */
    const dishLinkHTMLData = {id: dishTags, title: dishTags};
    const dishLinkHTML = templates.dishLink(dishLinkHTMLData);
    /* add generated code to html variable */
    html = html + dishLinkHTML;
    /* [NEW] check if this link is NOT already in allTags */
    if(!allDishes.hasOwnProperty(dishTags)){
      /* [NEW] add generated code to allTags array */
      allDishes[dishTags]= 1;
    } else {
      allDishes[dishTags]++;
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    const links = article.querySelectorAll('.dishes');
    console.log(links);
    for(let link of links){
      link.addEventListener('click', dishClickHandler);
    }
    /* END LOOP: for every article: */
    /* [NEW] find list of tags in right column */
    const dishList = document.querySelector('.dishes');
    const dishParams = calculateDishParams(allDishes);
    console.log('dishParams:', dishParams);
    /*[NEW] create variable for all links HTML code */
    const allDishesData = {dishes: []};
    /* [NEW] start LOOP: for each tags in alltags: */
    for(let dish in allDishes){
    /*[NEW] generate code of a link and add it to allTagsHTML: */
      const dishLinkHTML = '<li><a class="' + '" href="#dish-' + dish + '">' + dish + '</a></li>';
      allDishesData.dishes.push({
        dish: dish,
        count: allDishes[dish],
      });
    }
    /* [NEW] add HML from allTagsHTML to tagList */
    dishList.innerHTML = templates.dishCloudLink(allDishesData);
  }
}
generateDishes();

function dishClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
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
  /* START LOOP: for each link */
  for(let link of allLinksToDishes){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', dishClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToDishes();

