import testResult from "./testResult.json";
import testResultSchema from "./testResultSchema.json";
import Ajv from "ajv";
import { TestResult } from "../models/testResult";
import { dateFormatter } from "./parsers";

const SARSCoV2 = {
  name: "SARSCoV2",
  segmentFilterFieldPath: "3.2",
  segmentFilterValue: "CoVResult",
  fieldIdentifierFieldPath: "5",
  fieldIdentifierValues: ["Positive", "Negative"],
};

const Chlamydia = {
  name: "Chlamydia",
  segmentFilterFieldPath: "3.2",
  segmentFilterValue: "CTResult",
  fieldIdentifierFieldPath: "5",
  fieldIdentifierValues: ["CT neg", "CT pos"],
};

const Gonorrea = {
  name: "Gonorrea",
  segmentFilterFieldPath: "3.2",
  segmentFilterValue: "GCResult",
  fieldIdentifierFieldPath: "5",
  fieldIdentifierValues: ["GC neg", "GC pos"],
};

type FormData = {
  npn: string;
  resultType: string;
  result: string;
  facility: string;
};

export const testResultParserOutgoing = (formData: FormData): any => {
  let segmentFilterFieldPath, segmentFilterValue, fieldIdentifierFieldPath: string;

  switch (formData.resultType) {
    case SARSCoV2.name.toLowerCase():
      segmentFilterFieldPath = SARSCoV2.segmentFilterFieldPath;
      segmentFilterValue = SARSCoV2.segmentFilterValue;
      fieldIdentifierFieldPath = SARSCoV2.fieldIdentifierFieldPath;
      break;
    case Chlamydia.name.toLowerCase():
      segmentFilterFieldPath = Chlamydia.segmentFilterFieldPath;
      segmentFilterValue = Chlamydia.segmentFilterValue;
      fieldIdentifierFieldPath = Chlamydia.fieldIdentifierFieldPath;
      break;
    case Gonorrea.name.toLowerCase():
      segmentFilterFieldPath = Gonorrea.segmentFilterFieldPath;
      segmentFilterValue = Gonorrea.segmentFilterValue;
      fieldIdentifierFieldPath = Gonorrea.fieldIdentifierFieldPath;
      break;
    default:
      break;
  }

  let result = {
    ...testResult,
    npn: formData.npn,
    send_facility: formData.facility,
    name: formData.resultType,
    send_time: new Date().toISOString(),
    create_time: new Date().toISOString(),
    parsed_data: {
      ...testResult.parsed_data,
      segments: [
        {
          fields: [
            {
              key: segmentFilterFieldPath,
              value: segmentFilterValue,
            },
            {
              key: fieldIdentifierFieldPath,
              value: formData.result,
            },
          ],
          segment_id: "OBX",
        },
      ],
    },
  };

  if (validateSchema(testResultSchema, result)) {
    return result;
  } else {
    return null;
  }
};

export const testResultParserIncoming = (d: any): TestResult => {
  let type, result;
  for (let i = 0; i < d.parsed_data.segments.length; i++) {
    if (d.parsed_data.segments[i].segment_id === "OBX") {
      for (let j = 0; j < d.parsed_data.segments[i].fields.length; j++) {
        let key = d.parsed_data.segments[i].fields[j].key;
        let value = d.parsed_data.segments[i].fields[j].value;

        if (key === SARSCoV2.segmentFilterFieldPath && value === SARSCoV2.segmentFilterValue) {
          type = SARSCoV2.name;
        } else if (
          key === SARSCoV2.fieldIdentifierFieldPath &&
          SARSCoV2.fieldIdentifierValues.includes(value)
        ) {
          result = value;
        } else if (
          key === Chlamydia.segmentFilterFieldPath &&
          value === Chlamydia.segmentFilterValue
        ) {
          type = Chlamydia.name;
        } else if (
          key === Chlamydia.fieldIdentifierFieldPath &&
          Chlamydia.fieldIdentifierValues.includes(value)
        ) {
          result = value;
        } else if (
          key === Gonorrea.segmentFilterFieldPath &&
          value === Gonorrea.segmentFilterValue
        ) {
          type = Gonorrea.name;
        } else if (
          key === Gonorrea.fieldIdentifierFieldPath &&
          Gonorrea.fieldIdentifierValues.includes(value)
        ) {
          result = value;
        }
      }
    }
  }

  return {
    id: d.id,
    npn: d.npn,
    result: result,
    resultType: type,
    sendFacility: d.send_facility,
    sendTime: dateFormatter(d.send_time),
  } as TestResult;
};

const validateSchema = (schema: any, data: any) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    console.log(validate.errors);
    return false;
  } else {
    return true;
  }
};
