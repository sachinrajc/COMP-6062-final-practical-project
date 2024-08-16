const app = Vue.createApp({
    data() {
        return {
            firstName: 'Sachin Raj', 
            lastName: 'Charupadikkal',
            generaterandom: '',
            city: 'London',  // Default city
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            definition: {
                word: '',
                phonetic: '',
                partOfSpeech: '',
                definition: ''
            }
        };
    },
    computed: {
        studentName() {
            return this.firstName + ' ' +this.lastName;
        }
    },
    methods: {
        fetchFacts() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.generaterandom = data.text;
                })
                .catch(error => {
                    console.error('Error fetching random fact: ', error);
                });
            },
        fetchWeather() {
            fetch(`https://goweather.herokuapp.com/weather/${encodeURIComponent(this.city)}`)
            //fetch(`https://weather-data.liamstewart.ca/?city=London`)
            //fetch(`https://weather-data.liamstewart.ca/?city=${encodeURIComponent(this.city)}`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
            },
        fetchdefine(word) {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(this.word)}`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const wordData = data[0];
                    this.definition.word = wordData.word;
                    this.definition.phonetic = wordData.phonetic;
                    this.definition.partOfSpeech = wordData.meanings[0].partOfSpeech;
                    this.definition.definition = wordData.meanings[0].definitions[0].definition;
                })
                .catch(error => {
                    console.error('Error fetching word definition:', error);
                });
            }
        },
        mounted() {
            this.fetchFacts();  // Load a random fact on page load
            this.fetchWeather();   // Load weather for London, Ontario on page load
        }
});
app.mount('#app');

