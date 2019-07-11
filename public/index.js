//jshint esversion: 6
var newsArray;
var newsItems = 0;

//Adds 5 more news articles.
$('button').click(() => {
  newsItems += 5;
  console.log(newsArray);
  if (newsItems <= 15) {
    newsReel(newsArray);
  } else {
    alert('All out of news articles!');
  }
});


//Iniital loading logic. Calls to initially populate the page
let onLoadArray = [
  $.get("/api/market"),
  $.get("/api/crypto"),
  $.get("/api/news"),
  $.get('/api/jobs')
];


//After information loads from API calls, switch to main page.
Promise.all(onLoadArray).then((promArray) => {
  stockScroll(promArray[0]);
  cryptoDisplay(promArray[1]);
  newsArray = promArray[2].articles;
  newsReel(newsArray);
  jobPost(promArray[3]);
  $('#opening h2').text('Data load complete. Rendering page...');
  setTimeout(() => {
    $('#opening').css("display", "none");
    $('#main').css('display','block');
  }, 3000);
});




//Stock market information. If negative change then red, positive green.
function stockScroll(data) {
  for (let key in data) {
    if (data[key].change > 0) {
      $('.markets ul').append(`<li class='green'><span>${data[key].title}: </span>${data[key].price} USD (+${data[key].change}%)</li>`);
    } else {
      $('.markets ul').append(`<li class='red'><span>${data[key].title}: </span>${data[key].price} USD (-${data[key].change}%)</li>`);
    }
  }
}


//Crypto display information. Negative percent red, positive green.
function cryptoDisplay(data) {
  for (let crypto in data) {
    if (data[crypto].change > 0) {
      $('.crypto-listing ul').append(`<li class='green'><span>${data[crypto].title}:</span> ${data[crypto].price} (${data[crypto].change}%)</li>`);
    } else {
      $('.crypto-listing ul').append(`<li class='red'><span>${data[crypto].title}:</span> ${data[crypto].price} (${data[crypto].change}%)</li>`);
    }
  }
}


//Grabs initial five articles from news API.
function newsReel(data) {
  for (let i = 0; i < 5; i++) {
    $('#news ul').append(
      `<li><h4>${data[i+newsItems].title}</h4>
      <p>${concat(data[i+newsItems].description)}</p><a href='${data[i+newsItems].url}'>Link</a>
      </li>`);
  }
}

var concat = string => {
  if (string.length > 200) {
    return string.slice(0, 200) + '...';
  } else return string;
};

//Grabs jobs related to finance first, then if < 5 it displays all jobs.
function jobPost(data) {
  let count = data.jobs.finance.length;
  if (count < 5) {
    data.jobs.finance.forEach((job) => {
      appendFinance(job);
      // $('.finance-jobs ul').append(
      //   `<li><h4>Title: ${job.title}</h4>
      //   <p><span>Company: ${job.company.name}</span><br>
      //   <span>Category: ${job.category.name}</span><br>
      //   <a href='${job.apply_url}'>Apply Here</a>
      //   </p></li>`);
    });

    $('.finance-jobs h3 span').append(count);

    for (let i = 0; i < 5 - count; i++) {
      $('.all-jobs ul').append(
        `<li><h4>Title: ${data.jobs.all[i].title}</h4>
        <p><span>Company: ${data.jobs.all[i].company.name}</span><br>
        <span>Category: ${data.jobs.all[i].category.name}</span><br>
        <a href='${data.jobs.all[i].apply_url}'>Apply Here</a>
        </p></li>`);
    }
  } else {
    $('.finance-jobs h3 span').append(count);
    data.jobs.finance.forEach((job) => {
      appendFinance(job);
      // $('.finance-jobs').append(
      //   `<li><h4>Title: ${job.title}</h4>
      //   <p><span>Company: ${job.company.name}</span><br>
      //   <span>Category: ${job.category.name}</span><br>
      //   <a href='${job.apply_url}'>Apply Here</a>
      //   </p></li>`);
    });
  }
}

var appendFinance = job => {
  $('.finance-jobs ul').append(
    `<li><h4>Title: ${job.title}</h4>
    <p><span>Company: ${job.company.name}</span><br>
    <span>Category: ${job.category.name}</span><br>
    <a href='${job.apply_url}'>Apply Here</a>
    </p></li>`);
};
