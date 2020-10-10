# DOCUMENTATION FOR D3.TEAM
The website is introduced using index.html. From this page, the user can navigate further to the following sites:
* the Main Page
* Australians at a glance
* Australian Economy
* Maps of Australia

## The Main Page
This is the introduction page to the project. The objective of the website is to create awareness on Australia, its economy and population. The insipiration to this project was to use all the new skills and tools learnt from the bootcamp to transform a typical wikipedia page of Australia into something meaningful. 

This main page also sets the expectation of the website visitor to the site. 

## Australians at a Glance

The next big factor about Australia is its population. The team found a multitude of sources describing the demography and population of Australia. The common source that summarized this data was wikipedia. 

Using web scraping techniques, the team web scraped the data from relevant wikipedia sites. The team also validated the information against its quoted source. Based on this, the team used jupyter notebook to build up basic charts for visual. The outcome of these visuals are displayed in this section. 

In this page, the team showcased the distribution of the population in a map. The map of Australia has a layer to show population within the capital of each city and the population in the state. This map shows the most populous and least populous states. It also shows the size of the states for context. 

The line chart at the bottom of the page shows the growth of population since 1900. This increase in population is consistent with world growth and events. 

## Australia's Economy at a glance
One of the key stories we'd like to share is Australia's economy. As a very large island nation, Australia is dependent on solid foreign relationships and trade. The team used various sites to explore the data on Australia's trade. 

One of the interesting dataset obtained during the exploration for this project was from the Department of Trade and Foreign Affairs. From this source, the team obtained a wealth of data about Australia and its trading partners since 1987. This dataset was made available for public use via CSV. The team downloaded this dataset and processed this further. These steps are described further under the section for *Data Processing*. 

The team presented the economy in two parts, an overview and deep dive of Australia's economy per year. The overview insight is displayed in an animated racing bar chart. This interesting dataset shows the balance of trade between Australia and its trading partners. The team used this historical data from 1987 to 2019 and plotted against a racing bar chart. This visual paints the story of Australia and its strongest top trading partners over time. 

The detailed analysis of the economy shows Australia's economy from a year-to-year view. The key areas to understand Australia's economy are : 
- Top Deficit
- Top Surplus
- Top Export
- Top Import
- Top Total

The team displayed this information in three parts. The bubble chart shows the size of the economies trading with Australia. The second bar chart shows the top 10 nations trading with Australia for the selected year. This can be further described based on the key areas identified above. 

Another interesting visual was to show the Australia's trading partners in surplus or deficit using a treemap. The idea of a treemap provides the reader a quick understanding on the axis and size of a foreign country's trade interest with Australia. The largest two trading nations, which are China and the United States of America have high volume trade with Australia at the opposite ends of the spectrum. 

The final visualisation is to understand each country's relationship with Australia since 1987. The dataset available is limited to 1987  to 2019. This visualisation shows us the following : 
- The total trade : this shows the total monetary worth of the economic relationship
- The import    : this shows the import from the selected country to Australia
- The export    : this shows the export from Australia to the selected country
- The balance   : this is worth of that relationship to Australia. Where positive, this shows Australia is profiting from this relationship while negative shows Australia has monetary outflows from this relationship


## The Map of Australia

The final piece of our website relates to the geographical nature of Australia. The team were excited to showcase some interesting maps. The first map shows the population of Australians in each city and state. This gives the reader an idea of the distribution of Australians across the continent. The data that was used here was scraped from Wikipedia. 

The next map the team aspired to showcases the natural hazards of Australia. Bush fires has been a known calamity in Australia. This is due to climate change, vast swathes of dry bush and expansion of human habitation into the bush. The dataset obtained was a geojson file that earmarked the likelihood of bushfires using heatmaps. This is an optional map at point of writing this documentation. 

## Data Processing

The team used various techniques and tools to storytell about Australia. The sources of data used are stored in a folder named "Data" in Github. In this folder, the following are shared : 

| Data file | Description | 
|---|---|
|aus_trade | This is an excel file obtained for the Department of Foreign Affairs and Trade. All the data used for economy is provided from this file. |
| aus_trade.sqlite | This is the sqlite version of the excel file. This is used for the data visualisation| 
| aus_trade.json | This is the json vesion of the excel file. |
| distribution  | This is the csv file of the distribution of Australians across the country. This file was scrapped from a wikipedia page.| 
| ethinicity | This is the csv file of the ethnic make-up of Australians. This file was scrapped from a wikipedia page.| 
| population | This is the csv file showing the population growth of Australians from 1900. This is also scrapped from a wikipedia page| 

For the mapping, the team used leaflet. There are two types of maps being showcased. These are : 
- Heatmap of bushfire - this is using the chloropleth theme of leaflet.
- Australia and population - this is a standard display of Australia using customised markers to show the size of the population within each capital city and its state. 

For the bar chart race, the team found an interesting html plugin from flourish studio. This plugin processed the time-based data on Australia's economy. The data was uploaded onto the studio and this produced an embedded file for the html. 

For the website, the team used the standard html to produce the main page. The team also used bootstrap-css to customise the webpages. The team also ensured there is a navigation bar with a dropdown option. 

To display the data into a webpage, the team first transformed the dataset into sqlite files. Then, the team used flask to showcase the data on the economy. 

For webscraping, the team used pandas built-in capabilities. This tool enabled the team to obtain existing datasets from wikipedia to inspect, explore and use. 


For the documentation, the team used Markdown to document their journey and details of their webpages. 


## Future Work

As this dataset was sourced with the idea that it can be improved and worked in the near future, there are huge amount of potential that can be explored. The following are examples and suggestions for future work : 

| Area of Interest | Description |
|---|---|
| Sports | As a nation proud of its sports heritage, there's potential to delve into the history and progress of major Australian sports such as Australian Footy, Cricket and Rugby. |
| People | As a nation built up on immigration, there's a huge potential to explore and understand the indigenous population of Australia. |
| Energy | As a country that is rich of minerals, there's a huge potential to understand Australia's natural resources including fossil fuel, wind and solar. |


## Lessons Learnt

The team has a few key lessons learnt from this project. These are described as follows : 
- The data : The data exploration has always been a challenge for a topic that is very wide and diversed. The team was spoilt for choices, but had to limit its choices due to time constraints. In some instances, the data size was too large to work with. 
- The charts : The team learnt many different available visualisations. It was exciting to experiment with the different tecnologies. The team did find it challenging to learn and implement new js charts that was done before. However, this can be overcomed in due course. 
- The documentation : The team found it essential to keep a descriptive account of the project. The better approach is to maintain an updated documentation during the project execution. 

Overall, this challenging project opened up the team to new and exciting possibilities with data. 



