import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  jsonScheme = `{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "dob": {
      "type": "string"
    },
    "birthplace": {
      "type": "string"
    },
    "parents": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "birthplace": {
              "type": "string"
            },
            "dob": {
              "type": "string"
            },
            "dod": {
              "type": "string"
            },
            "parents": {
              "type": "array",
              "items": [
                {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "birthplace": {
                      "type": "string"
                    },
                    "dob": {
                      "type": "string"
                    },
                    "dod": {
                      "type": "string"
                    },
                    "married": {
                      "type": "string"
                    },
                    "parents": {
                      "type": "array",
                      "items": [
                        {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string"
                            },
                            "birthplace": {
                              "type": "string"
                            },
                            "dob": {
                              "type": "string"
                            },
                            "dod": {
                              "type": "string"
                            },
                            "married": {
                              "type": "string"
                            },
                            "parents": {
                              "type": "array",
                              "items": [
                                {
                                  "type": "object",
                                  "properties": {
                                    "name": {
                                      "type": "string"
                                    },
                                    "birthplace": {
                                      "type": "string"
                                    },
                                    "dob": {
                                      "type": "string"
                                    },
                                    "dod": {
                                      "type": "string"
                                    },
                                    "married": {
                                      "type": "string"
                                    },
                                    "parents": {
                                      "type": "array",
                                      "items": [
                                        {
                                          "type": "object",
                                          "properties": {
                                            "name": {
                                              "type": "string"
                                            },
                                            "birthplace": {
                                              "type": "string"
                                            },
                                            "dob": {
                                              "type": "string"
                                            },
                                            "dod": {
                                              "type": "string"
                                            }
                                          },
                                          "required": [
                                            "name",
                                            "birthplace",
                                            "dob",
                                            "dod"
                                          ]
                                        },
                                        {
                                          "type": "object",
                                          "properties": {
                                            "name": {
                                              "type": "string"
                                            },
                                            "birthplace": {
                                              "type": "string"
                                            },
                                            "dob": {
                                              "type": "string"
                                            }
                                          },
                                          "required": [
                                            "name",
                                            "birthplace",
                                            "dob"
                                          ]
                                        }
                                      ]
                                    }
                                  },
                                  "required": [
                                    "name",
                                    "birthplace",
                                    "dob",
                                    "dod",
                                    "married",
                                    "parents"
                                  ]
                                },
                                {
                                  "type": "object",
                                  "properties": {
                                    "name": {
                                      "type": "string"
                                    },
                                    "dob": {
                                      "type": "string"
                                    },
                                    "birthplace": {
                                      "type": "string"
                                    },
                                    "dod": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "name",
                                    "dob",
                                    "birthplace",
                                    "dod"
                                  ]
                                }
                              ]
                            }
                          },
                          "required": [
                            "name",
                            "birthplace",
                            "dob",
                            "dod",
                            "married",
                            "parents"
                          ]
                        },
                        {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string"
                            },
                            "dob": {
                              "type": "string"
                            },
                            "birthplace": {
                              "type": "string"
                            },
                            "dod": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "name",
                            "dob",
                            "birthplace",
                            "dod"
                          ]
                        }
                      ]
                    }
                  },
                  "required": [
                    "name",
                    "birthplace",
                    "dob",
                    "dod",
                    "married",
                    "parents"
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "dob": {
                      "type": "string"
                    },
                    "birthplace": {
                      "type": "string"
                    },
                    "dod": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "name",
                    "dob",
                    "birthplace",
                    "dod"
                  ]
                }
              ]
            }
          },
          "required": [
            "name",
            "birthplace",
            "dob",
            "dod",
            "parents"
          ]
        },
        {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "dob": {
              "type": "string"
            },
            "birthplace": {
              "type": "string"
            },
            "parents": {
              "type": "array",
              "items": [
                {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "birthplace": {
                      "type": "string"
                    },
                    "dob": {
                      "type": "string"
                    },
                    "married": {
                      "type": "string"
                    },
                    "parents": {
                      "type": "array",
                      "items": [
                        {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string"
                            },
                            "birthplace": {
                              "type": "string"
                            },
                            "dob": {
                              "type": "string"
                            },
                            "dod": {
                              "type": "string"
                            },
                            "parents": {
                              "type": "array",
                              "items": [
                                {
                                  "type": "object",
                                  "properties": {
                                    "name": {
                                      "type": "string"
                                    },
                                    "birthplace": {
                                      "type": "string"
                                    },
                                    "dob": {
                                      "type": "string"
                                    },
                                    "dod": {
                                      "type": "string"
                                    },
                                    "parents": {
                                      "type": "array",
                                      "items": [
                                        {
                                          "type": "object",
                                          "properties": {
                                            "name": {
                                              "type": "string"
                                            },
                                            "birthplace": {
                                              "type": "string"
                                            },
                                            "dob": {
                                              "type": "string"
                                            },
                                            "dod": {
                                              "type": "string"
                                            }
                                          },
                                          "required": [
                                            "name",
                                            "birthplace",
                                            "dob",
                                            "dod"
                                          ]
                                        },
                                        {
                                          "type": "object",
                                          "properties": {
                                            "name": {
                                              "type": "string"
                                            },
                                            "birthplace": {
                                              "type": "string"
                                            },
                                            "dob": {
                                              "type": "string"
                                            },
                                            "dod": {
                                              "type": "string"
                                            }
                                          },
                                          "required": [
                                            "name",
                                            "birthplace",
                                            "dob",
                                            "dod"
                                          ]
                                        }
                                      ]
                                    }
                                  },
                                  "required": [
                                    "name",
                                    "birthplace",
                                    "dob",
                                    "dod",
                                    "parents"
                                  ]
                                },
                                {
                                  "type": "object",
                                  "properties": {
                                    "name": {
                                      "type": "string"
                                    },
                                    "birthplace": {
                                      "type": "string"
                                    },
                                    "dob": {
                                      "type": "string"
                                    },
                                    "dod": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "name",
                                    "birthplace",
                                    "dob",
                                    "dod"
                                  ]
                                }
                              ]
                            }
                          },
                          "required": [
                            "name",
                            "birthplace",
                            "dob",
                            "dod",
                            "parents"
                          ]
                        },
                        {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string"
                            },
                            "dob": {
                              "type": "string"
                            },
                            "birthplace": {
                              "type": "string"
                            },
                            "dod": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "name",
                            "dob",
                            "birthplace",
                            "dod"
                          ]
                        }
                      ]
                    }
                  },
                  "required": [
                    "name",
                    "birthplace",
                    "dob",
                    "married",
                    "parents"
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "dob": {
                      "type": "string"
                    },
                    "birthplace": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "name",
                    "dob",
                    "birthplace"
                  ]
                }
              ]
            }
          },
          "required": [
            "name",
            "dob",
            "birthplace",
            "parents"
          ]
        }
      ]
    }
  },
  "required": [
    "name",
    "dob",
    "birthplace",
    "parents"
  ]
}`
}
