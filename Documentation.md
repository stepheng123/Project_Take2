# DOCUMENTATION FOR D3.TEAM
The website is introduced using index.html. From this page, the user can navigate further to the following sites:
* the Main Page
* Australians at a glance
* Australian Economy
* Maps of Australia

## The Main Page
This is the introduction page to the project. The objective of the website is to create awareness on Australia, its economy and population. The insipiration to this project was to use all the new skills and tools learnt from the bootcamp to transform a typical wikipedia page of Australia into something meaningful. 

This main page also sets the expectation of the website visitor to the site. 

## Australia's Economy at a glance
One of the key stories we'd like to share is Australia's economy. As a very large island nation, Australia is dependent on solid foreign relationships and trade. The team used various sites to explore the data on Australia's trade. 

One of the interesting dataset obtained during the exploration for this project was from the Department of Trade and Foreign Affairs. From this source, the team obtained a wealth of data about Australia and its trading partners since 1987. This dataset was made available for public use via CSV. The team downloaded this dataset and processed this further. These steps are described further under the section for *Data Processing*. 

One interesting dataset was the balance of trade between Australia and its trading partners. The team used this historical data from 1987 to 2019 and plotted against a racing bar chart. This visual paints the story of Australia and its strongest top trading partners over time. 

The team then went on to develop further interesting visuals on Australia's economy. One key area is to understand Australia's economy for : 
- Top Deficit
- Top Surplus
- Top Export
- Top Import
- Top Total

Another interesting visual was to show the Australia's trading partners in surplus or deficit using a treemap. The idea of a treemap provides the reader a quick understanding on the axis and size of a foreign country's trade interest with Australia. The largest two trading nations, which are China and the United States of America have high volume trade with Australia at the opposite ends of the spectrum. 


## Australians at a Glance

The next big factor about Australia is its population. The team found a multitude of sources describing the demography and population of Australia. The common source that summarized this data was wikipedia. 

Using web scraping techniques, the team web scraped the data from relevant wikipedia sites. The team also validated the information against its quoted source. Based on this, the team used jupyter notebook to build up basic charts for visual. The outcome of these visuals are displayed in this section. 

## The Map of Australia

The final piece of our website relates to the geographical nature of Australia. The team were excited to showcase some interesting maps. The first map shows the population of Australians in each city and state. This gives the reader an idea of the distribution of Australians across the continent. The data that was used here was scraped from Wikipedia. 

The next map showcases the natural hazards of Australia. Bush fires has been a known calamity in Australia. This is due to climate change, vast swathes of dry bush and expansion of human habitation into the bush. The dataset obtained was a geojson file that earmarked the likelihood of bushfires using heatmaps. 

## Data Processing

The team used various techniques and tools to storytell about Australia. The sources of data used are stored in a folder named "Data" in Github. In this folder, the following are shared : 

| Data file | Description | 
|---|---|
|aus_trade | this is an excel file obtained for the Department of Foreign Affairs and Trade. All the data used for economy is provided from this file. |
| aus_trade.sqlite | this is the sqlite version of the excel file. This is used for the data visualisation| 
| aus_trade.json | this is the json vesion of the excel file. |
| distribution  | this is the csv file of the distribution of Australians across the country. This file was scrapped from a wikipedia page.| 
| ethinicity | this is the csv file of the ethnic make-up of Australians. This file was scrapped from a wikipedia page.| 
| population | this is the csv file showing the population growth of Australians from 1900. This is also scrapped from a wikipedia page| 

For the mapping, the team used leaflet. There are two types of maps being showcased. These are : 
- Heatmap of bushfire - this is using the chloropleth theme of leaflet.
- Australia and population - this is a standard display of Australia using customised markers to show the size of the population within each capital city and its state. 

For the bar chart race, the team found an interesting html plugin from flourish studio. This plugin processed the time-based data on Australia's economy. The data was uploaded onto the studio and this produced an embedded file for the html. 

For the website, the team used the standard html to produce the main page. The team also used bootstrap-css to customise the webpages. The team also ensured there is a navigation bar with a dropdown option. 

To display the data into a webpage, the team first transformed the dataset into sqlite files. Then, the team used flask to showcase the data on the economy. 

For webscraping, the team used pandas built-in capabilities. This tool enabled the team to obtain existing datasets from wikipedia to inspect, explore and use. 


For the documentation, the team used Markdown to document their journey and details of their webpages. 






