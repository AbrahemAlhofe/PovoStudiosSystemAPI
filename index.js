const axios = require('axios');

// Your Notion API token
const NOTION_API_TOKEN = "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";
const NOTION_API_URL = "https://api.notion.com/v1";

const HEADERS = {
  
  'Authorization': `Bearer ${NOTION_API_TOKEN}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28'
  
}

function database(id) {
  
  return {
    
    id,
    
    async getEntries () {
        const url = `${NOTION_API_URL}/databases/${this.id}/query`;
        try {
          const response = await axios.post(url, {}, { headers: HEADERS });
          return response.data.results;
        } catch (error) {
          console.error('Error fetching entries:', error);
          return [];
        }
    },
    
    async updateEntry(source, target, propertyMapping) {
        const url = `${NOTION_API_URL}/pages/${target.id}`;
        const properties = mapProperties({ id: source.id, ...source.properties }, propertyMapping); // Adjust this to match your data structure

        try {
          await axios.patch(url, { properties }, { headers: HEADERS });
          console.log(`Updated entry: ${target.id}`);
        } catch (error) {
          console.error(`Error updating entry ${target.id}:`, error);
        }
    },
    
    async createEntry(source, propertyMapping) {
        const url = `${NOTION_API_URL}/pages`;
        const parent = { type: "database_id", database_id: this.id };
        const properties = mapProperties({ id: source.id, ...source.properties }, propertyMapping); // Adjust this to match your data structure

        console.log(properties)
      
        try {
          await axios.post(url, { parent, properties }, { headers: HEADERS });
          console.log(`Created entry in database: ${this.id}`);
        } catch (error) {
          console.error(`Error creating entry in database ${this.id}:`, error);
        }
    },
    
    async syncWith(sourceDatabase, propertyMap) {
      
      const sourceEntries = await sourceDatabase.getEntries();
      const targetEntries = await this.getEntries();
      let updatedEntriesIndex = 0;
      
      for (; updatedEntriesIndex < targetEntries.length; updatedEntriesIndex += 1) {
        
        const propertyMapping = propertyMap({ sourceEntry: sourceEntries[updatedEntriesIndex], ...sourceEntries[updatedEntriesIndex].properties })
        
        this.updateEntry(sourceEntries[updatedEntriesIndex], targetEntries[updatedEntriesIndex], propertyMapping);
        
      }
      
      for (let addedEntriesIndex = updatedEntriesIndex;addedEntriesIndex < sourceEntries.length; addedEntriesIndex += 1) {
        
        const target = this;
        
        const sourceEntry = sourceEntries[updatedEntriesIndex];
        
        const propertyMapping = propertyMap({ sourceEntry, ...sourceEntries[updatedEntriesIndex].properties })
        
        target.createEntry(sourceEntry, propertyMapping);
        
      }
      
    }
    
  }
  
};

function isPlainObject (object) {
  
  if( (typeof object === "object" || typeof A === 'function') && (object !== null) )
  {
      return true
  } else {
    return false;
  } 
  
}

function mapProperties(sourceProperties, propertyMapping) {
  const mappedProperties = {};

  function mapProperty (targetKey, value) {
        
    if (value.type === 'number') {
      mappedProperties[targetKey] = { number: value.number };
    } else if (value.type === 'select') {
      mappedProperties[targetKey] = { select: { name: value.select.name } };
    } else if (value.type === 'multi_select') {
      mappedProperties[targetKey] = { multi_select: value.multi_select.map(item => ({ name: item.name })) };
    } else if (value.type === 'title') {
      mappedProperties[targetKey] = { title: value.title.map(text => ({ text: { content: text.text.content } })) };
    } else if (value.type === 'rich_text') {
      mappedProperties[targetKey] = { rich_text: value.rich_text.map(text => ({ text: { content: text.text.content } })) };
    } else if (value.type === 'date') {
      mappedProperties[targetKey] = { date: value.date };
    } else if (value.type === 'checkbox') {
      mappedProperties[targetKey] = { checkbox: value.checkbox };
    } else if (value.type === 'url') {
      mappedProperties[targetKey] = { url: value.url };
    } else if (value.type === 'email') {
      mappedProperties[targetKey] = { email: value.email };
    } else if (value.type === 'phone_number') {
      mappedProperties[targetKey] = { phone_number: value.phone_number };
    } else if (value.type === 'files') {
      mappedProperties[targetKey] = { files: value.files };
    } else if (value.type === 'people') {
      mappedProperties[targetKey] = { people: value.people };
    } else if (value.type === 'relation') {
      mappedProperties[targetKey] = { relation: value.relation };
    } else if (value.type === 'status') {
      mappedProperties[targetKey] = { status: value.status };
    }
    
  }
  
  for (const [sourceKey, targetKey] of Object.entries(propertyMapping)) {
    const value = sourceProperties[sourceKey];
    if (isPlainObject(targetKey)) mapProperty(sourceKey, targetKey);
    else if (value) mapProperty(targetKey, value);
  }
  
  return mappedProperties;
}

database("11f731799bbb8090a669e06d3d115ce6").syncWith(database("118731799bbb80e79b33fde88af8baae"), ({sourceEntry, targetEntry}) => ({
    Name: "Name",
    Narrator: {
        "type": "relation",
        "relation": [
            {
                "id": sourceEntry.id
            }
        ]
    }
}))