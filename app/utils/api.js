function getUserData(playerUserName) {
  return Promise.all([
    getProfile(playerUserName),
    getRepos(playerUserName)
  ])
  .then(([profile, repos]) => ({
    profile,
    score: calculateScore(profile.followers, repos)
  }))
}

function getProfile(userName) {
  return fetch(`https://api.github.com/users/${userName}`)
    .then((response) => {
      return response.json();
    })
    .then((profile) => {
      if(profile.message) {
        throw new Error(
          profile.message === 'Not Found'
            ? `${userName} doesn't exist`
            : profile.message
        );
      }
      return profile;
    })
}

function getRepos(userName) {
  return fetch(`https://api.github.com/users/${username}/repos&per_page=100`)
    .then((response) => {
      response.json();
    })
    .then((repos) => {
      if(repos.message) {
        throw new Error(
          repos.message === 'Not Found'
            ? `${userName} doesn't exist`
            : repos.message
        );
      }
      return repos;
    })
}

function calculateScore(numOfFollowers, repos) {
  return (numOfFollowers * 3) + getStarCount(repos);
}

function getStarCount(repos) {
  return repos.reduce((totoalStarCount, repo) => {
    return totoalStarCount + repo.stargazers_count;
  }, 0)
}

function sortPlayers(players) {
  return players.sort((a, b) => {
    return b.score - a.score;
  })
}

export function battle(playerUserNames) {
  return Promise.all([
    getUserData(playerUserNames[0]),
    getUserData(playerUserNames[1])
  ])
  .then((results) => {
    sortPlayers(results)
  })
}

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
