const axios = require('axios');

async function getCodeforcesInfo(username) {
  let result = {
    name: username,
    Solved_for_all_time: 0,
    Solved_for_the_last_year: 0,
    In_a_row_for_the_last_year: 0,
    In_a_row_max: 0,
    Solved_for_the_last_month: 0,
    credit: 0
  };
  //name, Solved_for_all_time, Solved_for_the_last_year, 
  //In_a_row_for_the_last_year, In_a_row_max, Solved_for_the_last_month, credit
  try {
    let res = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}&checkHistoricHandles=false`,
      axiosConfig
    );
    let data = res.data
    result.Solved_for_all_time = res.country
    result.Solved_for_the_last_year = res.firstName
    result.In_a_row_for_the_last_year = res.maxRank
    result.In_a_row_max = res.rating
    result.Solved_for_the_last_month = res.contribution
    result.credit = data.maxRating
    result.name = data.handle

    for (const [key, value] of Object.entries(result)) {
      if(value.endsWith('万+')) {
        result[key] = value.replace('万+', '0k+');
      }
    }
  } catch (e) {
    console.error(e);
  }
  return result;
}

module.exports = getCodeforcesInfo;
