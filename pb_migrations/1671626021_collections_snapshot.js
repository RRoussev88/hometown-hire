migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2022-12-01 22:24:14.189Z",
      "updated": "2022-12-01 23:00:41.129Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpg",
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif"
            ],
            "thumbs": null
          }
        },
        {
          "system": false,
          "id": "leqsc7gf",
          "name": "businesses",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": null,
            "collectionId": "k152n7ly8ax4ir4",
            "cascadeDelete": true
          }
        }
      ],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 6,
        "onlyEmailDomains": null,
        "requireEmail": true
      }
    },
    {
      "id": "k152n7ly8ax4ir4",
      "created": "2022-12-01 22:58:45.733Z",
      "updated": "2022-12-06 01:15:25.469Z",
      "name": "businesses",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "tfvtm9ab",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "uafwd3lb",
          "name": "description",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "fqo2zoas",
          "name": "isActive",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "55ggvubv",
          "name": "paidUntil",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "vsgwjnco",
          "name": "contactEmail",
          "type": "email",
          "required": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        },
        {
          "system": false,
          "id": "48fzi9fe",
          "name": "contactWebsite",
          "type": "url",
          "required": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        },
        {
          "system": false,
          "id": "d9mp1gks",
          "name": "thumbnail",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [],
            "thumbs": []
          }
        },
        {
          "system": false,
          "id": "ikyxwuer",
          "name": "country",
          "type": "select",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "Luxembourg",
              "Germany",
              "France",
              "Belgium",
              "Netherlands",
              "Spain",
              "Portugal"
            ]
          }
        },
        {
          "system": false,
          "id": "caub7l9b",
          "name": "area",
          "type": "select",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 7,
            "values": [
              "Luxembourg",
              "Germany",
              "France",
              "Belgium",
              "Netherlands",
              "Spain",
              "Portugal"
            ]
          }
        },
        {
          "system": false,
          "id": "ebd1hwf7",
          "name": "contactPhone",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": "\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d| 2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]| 4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$"
          }
        },
        {
          "system": false,
          "id": "agnlruml",
          "name": "address",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 1000,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "piravqif",
          "name": "openingHours",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "o6wymjgb",
          "name": "socialMediaLinks",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "ktcqxpn4",
          "name": "rating",
          "type": "number",
          "required": true,
          "unique": false,
          "options": {
            "min": 1,
            "max": 5
          }
        },
        {
          "system": false,
          "id": "kfaaedur",
          "name": "priority",
          "type": "number",
          "required": true,
          "unique": false,
          "options": {
            "min": 1,
            "max": null
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "jhq5j6nlmlgil19",
      "created": "2022-12-03 23:41:55.207Z",
      "updated": "2022-12-08 22:18:12.711Z",
      "name": "unitsOfMeasure",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "uecukv7p",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "8mgj0zrs",
          "name": "shortName",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "nk0s3gxzm64ddgf",
      "created": "2022-12-03 23:59:38.548Z",
      "updated": "2022-12-08 22:18:03.076Z",
      "name": "serviceCategories",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "gtwtoowg",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": 1,
            "max": 100,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "bnyjrarb",
          "name": "description",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 1000,
            "pattern": ""
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "eh4tjkxx1oiotz7",
      "created": "2022-12-04 00:16:50.359Z",
      "updated": "2022-12-08 22:16:49.800Z",
      "name": "services",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ssrwkeau",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": 1,
            "max": 100,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "6pg8fmv8",
          "name": "description",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 500,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "lsualyd1",
          "name": "isAvailable",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "sxhnllov",
          "name": "category",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "collectionId": "nk0s3gxzm64ddgf",
            "cascadeDelete": false
          }
        },
        {
          "system": false,
          "id": "o5tnuiom",
          "name": "business",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "collectionId": "k152n7ly8ax4ir4",
            "cascadeDelete": false
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "ntrru83upcjud0z",
      "created": "2022-12-04 01:08:25.449Z",
      "updated": "2022-12-06 00:29:18.543Z",
      "name": "offers",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "tzlkci4u",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": 100,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "pbwmbnnq",
          "name": "description",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 500,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "zji5yagv",
          "name": "service",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "collectionId": "eh4tjkxx1oiotz7",
            "cascadeDelete": true
          }
        },
        {
          "system": false,
          "id": "jqossbjl",
          "name": "unitOfMeasure",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "collectionId": "jhq5j6nlmlgil19",
            "cascadeDelete": false
          }
        },
        {
          "system": false,
          "id": "c0dhn9am",
          "name": "price",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "qnjsjjpe",
          "name": "currency",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
