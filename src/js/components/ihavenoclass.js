///Wes Boss Knows Beer
const beer = {
  name: 'Belgian Wit',
  brewery: `Steam Whistle Brewery`,
  keywords: ['pale', 'cloudy', 'spiced', 'crisp']
};

function renderKeywords(keywords) {
  return `
  <ul>
      ${keywords.map(keyword => `<li>${keyword}</li>`).join('')}
  </ul>
  `;
}
//think widget library!
const component = `
<div class="row">
<div class="col-sm-6"><h3 class="animated jello">I'm a widget that has no class!</h3></div>
<div class="col-sm-6">
  <div class="beer">
    <h2>${beer.name}</h2>
    <p class="brewery">${beer.brewery}</p>
    ${renderKeywords(beer.keywords)}
  </div>
</div>
</div>
`;
//inject it into the DOM
document.getElementById('buymeabeer').innerHTML = component;