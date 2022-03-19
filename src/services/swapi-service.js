export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';
  _imageBase = 'https://starwars-visualguide.com/assets/img';
  _defaultImage = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg'

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  };

  getImageUrl = async (url) => {
    const res = await fetch(`${this._imageBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }

    return res.url;
  }

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results
      .map(this._transformPerson)
      .slice(0, 5);
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    const imageUrl = await this.getPersonImage(id)

    return this._transformPerson(person, imageUrl);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results
      .map(this._transformPlanet)
      .slice(0, 5);
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    const imageUrl = await this.getPlanetImage(id)

    return this._transformPlanet(planet, imageUrl);
  };

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results
      .map(this._transformStarship)
      .slice(0, 5);
  };

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    const imageUrl = await this.getStarshipImage(id)

    console.log("starshipurl", imageUrl);
    return this._transformStarship(starship, imageUrl);
  };

  getPersonImage = (id) => {
    const url = `/characters/${id}.jpg`;

    return this.getImageUrl(url)
      .then((imageUrl) => {
       return imageUrl;
      })
      .catch((err) => {
        console.log('Error while loading image:', err);
        return this._defaultImage;
      });
  };

  getStarshipImage = (id) => {
    const url = `/starships/${id}.jpg`;

    return this.getImageUrl(url)
      .then((imageUrl) => {
        return imageUrl;
      })
      .catch((err) => {
        console.log('Error while loading image:', err);
        return this._defaultImage;
      });
  };

  getPlanetImage = (id) => {
    const url = `/planets/${id}.jpg`;

    return this.getImageUrl(url)
      .then((imageUrl) => {
        return imageUrl;
      })
      .catch((err) => {
        console.log('Error while loading image:', err);
        return this._defaultImage;
      });
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet = (planet, imageUrl) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
      imageUrl: imageUrl
    };
  };

  _transformStarship = (starship, imageUrl) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
      imageUrl: imageUrl
    }
  };

  _transformPerson = (person, imageUrl) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
      imageUrl: imageUrl
    }
  }
}
