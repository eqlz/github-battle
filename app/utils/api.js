export function fetchPopularRepos (language) {
  const endPoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
    ${language}&sort=stars&order=desc&type=Repositories`);
  
  return fetch(endPoint)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if(!data.items) {
        throw new Error(data.message)
      }

      return data.items;
    })
}
