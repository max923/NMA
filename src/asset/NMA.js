export default{
	"info": {
		"name": "NMA",
		"_postman_id": "c5169869-9cdd-c24e-6983-64030f5efc00",
		"description": "Basic success response\n{\n\tcode: 200,\n\tdata: {}\n}\n\nBasic error response\n{\n\tcode: 500,\n\tmessage: \"\",\n}\n\nBasice fields error response\n{\n\tcode: 401,\n\terror: [\n\t\t{field: \"\", message: \"\"},\n\t\t{field: \"\", message: \"\"}\n\t]\n}",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "/nma/api/patient",
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "/nma/api/patient",
					"path": [
						"nma",
						"api",
						"patient"
					]
				},
				"description": "Get all patients"
			},
			"response": [
				{
					"id": "ce63353f-3fa1-49bb-8177-514c7ac9be00",
					"name": "Basic",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": ""
						},
						"url": {
							"raw": "/nma/api/patient",
							"path": [
								"nma",
								"api",
								"patient"
							]
						}
					},
					"code": 200,
					"_postman_previewlanguage": "json",
					"_postman_previewtype": "parsed",
					"header": [],
					"cookie": [],
					"responseTime": 0,
					"body": "{\n    \"code\": 200,\n    \"data\": [\n        {\n            \"seq\": 1,\n            \"patient_no\": 1,\n            \"name\": \"Jack\",\n            \"birth\": \"1989-09-02\",\n            \"gender\": \"M\",\n            \"address\": \"xxxxxxxxxxx\",\n            \"tel\": \"xxxxxxxx\",\n            \"blood_type\": \"AB\",\n            \"blood_surger\": 2.7,\n            \"idl\": 1.8,\n            \"hdl\": 2.6,\n            \"triglyceride\": 3.7,\n            \"risk_heart_disease\": \"L\",\n            \"primaryDoctor\": {\n                \"seq\": 2,\n                \"annual_salary\": 70000,\n                \"specialty\": \"xxxxxxx\",\n                \"employee\": {\n                    \"seq\": 4,\n                    \"emp_no\": 4,\n                    \"ssn\": \"xxxxxxxxx\",\n                    \"name\": \"Jack\",\n                    \"gender\": \"M\",\n                    \"address\": \"xxxxxx\",\n                    \"tel\": \"xxxxxxxx\"\n                }\n            }\n        },\n        {\n            \"seq\": 2,\n            \"patient_no\": 2,\n            \"name\": \"Noujon\",\n            \"birth\": \"1989-09-02\",\n            \"gender\": \"M\",\n            \"address\": \"xxxxxxxxxxx\",\n            \"tel\": \"xxxxxxxx\",\n            \"blood_type\": \"AB\",\n            \"blood_surger\": 2.7,\n            \"idl\": 1.8,\n            \"hdl\": 2.6,\n            \"triglyceride\": 3.7,\n            \"risk_heart_disease\": \"N\",\n            \"primaryDoctor\": {\n                \"seq\": 3,\n                \"annual_salary\": 70000,\n                \"specialty\": \"xxxxxxx\",\n                \"employee\": {\n                    \"seq\": 5,\n                    \"emp_no\": 5,\n                    \"ssn\": \"xxxxxxxxx\",\n                    \"name\": \"Hudson\",\n                    \"gender\": \"F\",\n                    \"address\": \"xxxxxx\",\n                    \"tel\": \"xxxxxxxx\"\n                }\n            }\n        }\n    ]\n}"
				}
			]
		},
		{
			"name": "/nma/api/patient/40",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "/nma/api/patient/40",
					"path": [
						"nma",
						"api",
						"patient",
						"40"
					]
				},
				"description": "Get specific patient by seq"
			},
			"response": [
				{
					"id": "6626331b-76e0-480d-837f-2c3208bc25d5",
					"name": "Basic",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"body": {},
						"url": {
							"raw": "/api/nma/patient/1",
							"path": [
								"api",
								"nma",
								"patient",
								"1"
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"_postman_previewtype": "parsed",
					"header": [],
					"cookie": [],
					"responseTime": 0,
					"body": "{\n    \"code\": 200,\n    \"data\": {\n        \"seq\": 1,\n        \"patient_no\": 1,\n        \"name\": \"Marry\",\n        \"birth\": \"1989-09-02\",\n        \"gender\": \"F\",\n        \"address\": \"xxxxxxxxxxx\",\n        \"tel\": \"xxxxxxxx\",\n        \"blood_type\": \"AB\",\n        \"blood_surger\": 2.7,\n        \"idl\": 1.8,\n        \"hdl\": 2.6,\n        \"triglyceride\": 3.7,\n        \"risk_heart_disease\": \"L\",\n        \"primaryDoctor\": {\n            \"seq\": 2,\n            \"annual_salary\": 70000,\n            \"specialty\": \"xxxxxxx\",\n            \"employee\": {\n                \"seq\": 4,\n                \"emp_no\": 4,\n                \"ssn\": \"xxxxxxxxx\",\n                \"name\": \"Jack\",\n                \"gender\": \"M\",\n                \"address\": \"xxxxxx\",\n                \"tel\": \"xxxxxxxx\"\n            }\n        }\n    }\n}"
				}
			]
		},
		{
			"name": "/nma/api/patient/illness?patient_seq=1",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "/nma/api/patient/illness?patient_seq=1",
					"path": [
						"nma",
						"api",
						"patient",
						"illness"
					],
					"query": [
						{
							"key": "patient_seq",
							"value": "1",
							"equals": true,
							"description": "Patient's seq num"
						}
					]
				},
				"description": "Get patient's illness history"
			},
			"response": [
				{
					"id": "96ad9f9f-016b-45c9-95bd-2080b1703f0f",
					"name": "Basic",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"body": {},
						"url": {
							"raw": "/api/nma/patient/illness?patient_seq=1",
							"path": [
								"api",
								"nma",
								"patient",
								"illness"
							],
							"query": [
								{
									"key": "patient_seq",
									"value": "1",
									"equals": true,
									"description": "Patient's seq num"
								}
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"_postman_previewtype": "parsed",
					"header": [],
					"cookie": [],
					"responseTime": 0,
					"body": "{\n    \"code\": 200,\n    \"data\": {\n        \"patient\": {\n            \"name\": \"Jack\"\n        },\n        \"illnesses\": [\n            {\n                \"doctor\": {\n                    \"name\": \"Marry\"\n                },\n                \"code\": \"1334\",\n                \"name\": \"Headache\",\n                \"description\": \"Hahahahahah\",\n                \"dateDiagnosis\": \"2015-02-24\"\n            },\n            {\n                \"doctor\": {\n                \t\"name\": \"Leo\"}\n                \t,\n                \"code\": \"1542\",\n                \"name\": \"Cough\",\n                \"description\": \"Woooooooooo\",\n                \"dateDiagnosis\": \"2016-07-15\"\n            }\n        ]\n    }\n}"
				}
			]
		},
		{
			"name": "/nma/api/patient/allergy?patient_seq=1",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "/nma/api/patient/allergy?patient_seq=1",
					"path": [
						"nma",
						"api",
						"patient",
						"allergy"
					],
					"query": [
						{
							"key": "patient_seq",
							"value": "1",
							"equals": true
						},
						{
							"key": "",
							"value": "",
							"description": "Patient's seq num",
							"type": "text"
						}
					]
				},
				"description": "Get patient's allergy history"
			},
			"response": [
				{
					"id": "95d700ce-4dae-4d75-8c6a-85156a43bcd5",
					"name": "Basic",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"body": {},
						"url": {
							"raw": "/api/nma/patient/allergy?patient_seq=1",
							"path": [
								"api",
								"nma",
								"patient",
								"allergy"
							],
							"query": [
								{
									"key": "patient_seq",
									"value": "1",
									"equals": true
								},
								{
									"key": "",
									"value": "",
									"description": "Patient's seq num",
									"type": "text"
								}
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"_postman_previewtype": "parsed",
					"header": [],
					"cookie": [],
					"responseTime": 0,
					"body": "{\n    \"code\": 200,\n    \"data\": {\n        \"patient\": {\n            \"name\": \"Jack\"\n        },\n        \"allergy\": [\n            {\n                \"doctor\": {\n                    \"name\": \"Marry\"\n                },\n                \"code\": \"1334\",\n                \"name\": \"Nose allergy\",\n                \"description\": \"Hahahahahah\",\n                \"dateDiagnosis\": \"2015-02-24\"\n            },\n            {\n                                \"doctor\": {\n                    \"name\": \"Leo\"\n                },\n                \"code\": \"1542\",\n                \"name\": \"Wind allergy\",\n                \"description\": \"Woooooooooo\",\n                \"dateDiagnosis\": \"2016-07-15\"\n            }\n        ]\n    }\n}"
				}
			]
		},
		{
			"name": "/nma/api/patient/1",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"name\": \"Jack\",\n\t\"birth\": \"1989-09-02\",\n\t\"gender\": \"M\",\n\t\"address\": \"xxxxxxxxxxx\",\n\t\"tel\": \"xxxxxxxx\",\n\t\"blood_type\": \"O\",\n\t\"blood_surger\": 2.7,\n\t\"idl\": 1.8,\n\t\"hdl\": 2.6,\n\t\"triglyceride\": 3.7,\n\t\"primaryDoctor\": 2,\n\t\"illnesses\": [248, 302, 126],\n\t\"allergies\": [112, 203]\n}"
				},
				"url": {
					"raw": "/nma/api/patient/1",
					"path": [
						"nma",
						"api",
						"patient",
						"1"
					]
				},
				"description": "Insert a new patient, including his/her basic information and medical information and illness history and allergy history"
			},
			"response": []
		},
		{
			"name": "/nma/api/physician",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "/nma/api/physician",
					"path": [
						"nma",
						"api",
						"physician"
					]
				},
				"description": "Get all physicians(doctors)"
			},
			"response": [
				{
					"id": "9b708d38-1687-4071-9c5f-43943ddabb2b",
					"name": "Basic",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"body": {},
						"url": {
							"raw": "/nma/api/physician",
							"path": [
								"nma",
								"api",
								"physician"
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"_postman_previewtype": "parsed",
					"header": [],
					"cookie": [],
					"responseTime": 0,
					"body": "{\n    \"code\": 200,\n    \"data\": [\n        {\n            \"annual_salary\": 70000,\n            \"specialty\": \"xxxxxxxxxxx\",\n            \"employee\": {\n                \"seq\": 2,\n                \"emp_no\": 2,\n                \"ssn\": \"xxxxxxxxx\",\n                \"name\": \"Jack\",\n                \"gender\": \"M\",\n                \"address\": \"xxxxxxxxx\",\n                \"tel\": \"xxxxxxx\"\n            }\n        },\n        {\n            \"annual_salary\": 70000,\n            \"specialty\": \"xxxxxxxxxxx\",\n            \"employee\": {\n                \"seq\": 3,\n                \"emp_no\": 3,\n                \"ssn\": \"xxxxxxxxx\",\n                \"name\": \"Marry\",\n                \"gender\": \"F\",\n                \"address\": \"xxxxxxxxx\",\n                \"tel\": \"xxxxxxx\"\n            }\n        }\n    ]\n}"
				}
			]
		},
		{
			"name": "/nma/api/consultation",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"patient_seq\": 1,\n\t\"doctor_seq\": 3,\n\t\"datetime\": \"2017-07-12 15:00:00\"\n}"
				},
				"url": {
					"raw": "/nma/api/consultation",
					"path": [
						"nma",
						"api",
						"consultation"
					]
				},
				"description": "Make an appointment with doctor"
			},
			"response": []
		},
		{
			"name": "/nma/api/consultation?doctor=1&date=2016-07-23",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "/nma/api/consultation?doctor_seq=1&date=2016-07-23",
					"path": [
						"nma",
						"api",
						"consultation"
					],
					"query": [
						{
							"key": "doctor_seq",
							"value": "1",
							"equals": true
						},
						{
							"key": "date",
							"value": "2016-07-23",
							"equals": true,
							"description": "which day"
						}
					]
				},
				"description": "View scheduled per doctor and per day"
			},
			"response": [
				{
					"id": "ecb32685-3715-4a64-a391-6ca6760eba7f",
					"name": "Basic",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"body": {},
						"url": {
							"raw": "/nma/api/consultation?doctor=1&date=2016-07-23",
							"path": [
								"nma",
								"api",
								"consultation"
							],
							"query": [
								{
									"key": "doctor",
									"value": "1",
									"equals": true,
									"description": "which physician(doctor)"
								},
								{
									"key": "date",
									"value": "2016-07-23",
									"equals": true,
									"description": "which day"
								}
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"_postman_previewtype": "parsed",
					"header": [],
					"cookie": [],
					"responseTime": 0,
					"body": "{\n    \"code\": 200,\n    \"data\": [\n        {\n            \"datetime\": \"2016-07-23 08:30:00\",\n            \"doctor\": {\n                \"name\": \"Jack\"\n            },\n            \"patient\": {\n                \"name\": \"Hanrry\"\n            }\n        },\n        {\n            \"datetime\": \"2016-07-23 10:30:00\",\n            \"doctor\": {\n                \"name\": \"Jack\"\n            },\n            \"patient\": {\n                \"name\": \"Muse\"\n            }\n        }\n    ]\n}"
				}
			]
		},
		{
			"name": "/nma/api/available_inpatient_bed",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "/nma/api/available_inpatient_bed",
					"path": [
						"nma",
						"api",
						"available_inpatient_bed"
					]
				},
				"description": "Check for available room/bed"
			},
			"response": [
				{
					"id": "da388b27-6cef-4092-84c0-3a5a8e5a8ab1",
					"name": "Basic",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"body": {},
						"url": {
							"raw": "/nma/api/available_inpatient_bed",
							"path": [
								"nma",
								"api",
								"available_inpatient_bed"
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"_postman_previewtype": "parsed",
					"header": [],
					"cookie": [],
					"responseTime": 0,
					"body": "{\n    \"code\": 200,\n    \"data\": [\n        {\n            \"seq\": 1,\n            \"room\": {\n                \"room_num\": \"201\"\n            },\n            \"bed_id\": \"A\"\n        },\n        {\n            \"seq\": 2,\n            \"room\": {\n                \"room_num\": \"201\"\n            },\n            \"bed_id\": \"C\"\n        },\n        {\n            \"seq\": 3,\n            \"room\": {\n                \"room_num\": \"202\"\n            },\n            \"bed_id\": \"B\"\n        }\n    ]\n}"
				}
			]
		},
		{
			"name": "/nma/api/inpatient/room_bed",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"patient_seq\": 1,\n\t\"bed_seq\": 6\n}"
				},
				"url": {
					"raw": "/nma/api/inpatient/bed",
					"path": [
						"nma",
						"api",
						"inpatient",
						"bed"
					]
				},
				"description": "Assign a room and a bed to patient"
			},
			"response": []
		},
		{
			"name": "/nma/api/inpatient/bed",
			"request": {
				"method": "DELETE",
				"header": [],
				"body": {},
				"url": {
					"raw": "/nma/api/inpatient/bed?patient_seq=1&bed_seq=5",
					"path": [
						"nma",
						"api",
						"inpatient",
						"bed"
					],
					"query": [
						{
							"key": "patient_seq",
							"value": "1",
							"equals": true
						},
						{
							"key": "bed_seq",
							"value": "5",
							"equals": true
						}
					]
				},
				"description": "Remove bed from inpatient"
			},
			"response": []
		},
		{
			"name": "/nma/api/inpatient",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "/nma/api/inpatient",
					"path": [
						"nma",
						"api",
						"inpatient"
					]
				},
				"description": "View all inpatients"
			},
			"response": [
				{
					"id": "534bdd05-3adf-44e4-b618-63859e5e7973",
					"name": "Basic",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"body": {},
						"url": {
							"raw": "/nma/api/inpatient",
							"path": [
								"nma",
								"api",
								"inpatient"
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"_postman_previewtype": "parsed",
					"header": [],
					"cookie": [],
					"responseTime": 0,
					"body": "{\n    \"code\": 200,\n    \"data\": [\n        {\n            \"seq\": 1,\n            \"nursingUnit\": \"xxxxx\",\n            \"patient\": {\n                \"name\": \"Jack\"\n            },\n            \"bed\": {\n            \t\"room\": {\n            \t\t\"room_num\": 201\n            \t},\n            \t\"bed_id\": \"A\"\n            },\n            \"nurse\": {\n            \t\"employee\": {\n            \t\t\"name\": \"Marry\"\n            \t}\n            }\n        }\n    ]\n}"
				}
			]
		}
	]
}
// 19:29 Freddy 1. 查看所有病人資料
// 19:29 Freddy 2. 新增病人
// 19:30 Freddy 3. 查看某病人的所有疾病記錄
// 19:30 Freddy 4. 查看某病人的所有過敏記錄
// 19:31 Freddy 5. 查看所有consultation（看診）紀錄
// 19:31 Freddy 6. 排定看診（選擇病人，選擇醫生，選擇日期）