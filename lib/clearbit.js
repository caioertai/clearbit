const authorization = "Bearer sk_33883e2b8b3066b2216f3dd4aa063ee0";
const clearbitEmailEnrichmentURL = "https://person.clearbit.com/v2/combined/find?email="
const form = document.querySelector('#clearbitForm');

const addUserInfoToInterface = (userInfo) => {
  // replace the innertext of the current elements
  const userName = document.querySelector('#userName');
  const userEmail = document.querySelector('#userEmail');
  const userBio = document.querySelector('#userBio');
  const userLocation = document.querySelector('#userLocation');
  userName.innerText = userInfo.fullName;
  userEmail.innerText = userInfo.email;
  userBio.innerText = userInfo.bio;
  userLocation.innerText = userInfo.location;
}

// Rewrite the default form submit behaviour
form.addEventListener('submit',(event) => {
  event.preventDefault();
  //   Get the the value of the input
  const emailInput = event.currentTarget.querySelector('#clearbitEmail');

  //   fetch info from clearbit URL
  fetch(clearbitEmailEnrichmentURL + emailInput.value, {
    headers: { Authorization: authorization }
  })
    .then((response) => { return response.json() })
    .then((data) => {
      // Find the relevant info, Store the info
      const person = data.person;
      const personShortInfo = {
        fullName: person.name.fullName,
        bio: person.bio,
        email: person.email,
        location: person.location
      };
      addUserInfoToInterface(personShortInfo);
    });

});
