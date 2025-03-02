import * as React from 'react';
import parsePhoneNumberFromString, { CountryCode } from 'libphonenumber-js';
import { AutoFormFieldProps } from '../react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export const PhoneComponent: React.FC<AutoFormFieldProps> = (props) => {
  const [phoneOrigin, setPhoneOrigin] = React.useState<string>(props.value?.phoneOrigin || '');
  const [countryCode, setCountryCode] = React.useState<string>(props.value?.phoneCountryCode || 'FR');

  const handleCountryChange = (newCountryCode: string) => {
    setCountryCode(newCountryCode);
    const newPhoneApi: PhoneApi = {
      phoneCountryCode: newCountryCode,
      phoneOrigin,
      isValid: isValidPhone(phoneOrigin, newCountryCode as CountryCode),
      phoneFormated: FormatPhoneNumber(phoneOrigin, newCountryCode as CountryCode),
    };
    const syntheticEvent = {
      target: {
        value: newPhoneApi,
        name: props.field.key,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    props.inputProps.onChange(syntheticEvent);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneOrigin = event.target.value;
    setPhoneOrigin(newPhoneOrigin);
    const newPhoneApi: PhoneApi = {
      phoneCountryCode: countryCode,
      phoneOrigin: newPhoneOrigin,
      isValid: isValidPhone(newPhoneOrigin, countryCode as CountryCode),
      phoneFormated: FormatPhoneNumber(newPhoneOrigin, countryCode as CountryCode),
    };
    const syntheticEvent = {
      target: {
        value: newPhoneApi,
        name: props.field.key,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    props.inputProps.onChange(syntheticEvent);
  };
  const { key, value, onChange, ref, error, onBlur,  ...propsinputProps } = props.inputProps;
  
  return (
    <div className="flex gap-2">
      <Select value={countryCode} onValueChange={handleCountryChange}>
        <SelectTrigger className="max-w-fit">
          <SelectValue placeholder="Sélectionner un pays" />
        </SelectTrigger>
        <SelectContent>
          {ListCountryCode.map((country, i) => (
            <SelectItem key={i} value={country.value}>
              {country.content}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input {...propsinputProps}  value={phoneOrigin} onChange={handlePhoneNumberChange} data-testid="phone" />
    </div>
  );
};

const isValidPhone = (phonenumber: string, countryCode: CountryCode): boolean => {
  const phoneNumberParse = parsePhoneNumberFromString(phonenumber, countryCode);
  if (phonenumber.match(/[a-z]/i)) {
    return false;
  }
  if (!phoneNumberParse) {
    return false;
  }
  if (phonenumber.match(/0{4,}/)) {
    return false;
  }
  return phoneNumberParse.isValid() === true;
};
interface PhoneApi {
  phoneOrigin?: string;
  phoneCountryCode?: string;
  phoneFormated?: string;
  isValid?: boolean;
}

export function FormatPhoneNumber(phonenumber: string, countryCode: CountryCode): string | undefined {
  const phoneNumberParse = parsePhoneNumberFromString(phonenumber, countryCode);
  if (!phoneNumberParse) {
    return undefined;
  }
  return phoneNumberParse.number.toString();
}

const ListCountryCode = [
  {
    value: 'AC',
    content: 'AC +247',
  },
  {
    value: 'AD',
    content: 'AD +376',
  },
  {
    value: 'AE',
    content: 'AE +971',
  },
  {
    value: 'AF',
    content: 'AF +93',
  },
  {
    value: 'AG',
    content: 'AG +1',
  },
  {
    value: 'AI',
    content: 'AI +1',
  },
  {
    value: 'AL',
    content: 'AL +355',
  },
  {
    value: 'AM',
    content: 'AM +374',
  },
  {
    value: 'AO',
    content: 'AO +244',
  },
  {
    value: 'AR',
    content: 'AR +54',
  },
  {
    value: 'AS',
    content: 'AS +1',
  },
  {
    value: 'AT',
    content: 'AT +43',
  },
  {
    value: 'AU',
    content: 'AU +61',
  },
  {
    value: 'AW',
    content: 'AW +297',
  },
  {
    value: 'AX',
    content: 'AX +358',
  },
  {
    value: 'AZ',
    content: 'AZ +994',
  },
  {
    value: 'BA',
    content: 'BA +387',
  },
  {
    value: 'BB',
    content: 'BB +1',
  },
  {
    value: 'BD',
    content: 'BD +880',
  },
  {
    value: 'BE',
    content: 'BE +32',
  },
  {
    value: 'BF',
    content: 'BF +226',
  },
  {
    value: 'BG',
    content: 'BG +359',
  },
  {
    value: 'BH',
    content: 'BH +973',
  },
  {
    value: 'BI',
    content: 'BI +257',
  },
  {
    value: 'BJ',
    content: 'BJ +204',
  },
  {
    value: 'BL',
    content: 'BL +590',
  },
  {
    value: 'BM',
    content: 'BM +1',
  },
  {
    value: 'BN',
    content: 'BN +673',
  },
  {
    value: 'BO',
    content: 'BO +591',
  },
  {
    value: 'BQ',
    content: 'BQ +599',
  },
  {
    value: 'BR',
    content: 'BR +55',
  },
  {
    value: 'BS',
    content: 'BS +1',
  },
  {
    value: 'BT',
    content: 'BT +975',
  },
  {
    value: 'BW',
    content: 'BW +267',
  },
  {
    value: 'BY',
    content: 'BY +375',
  },
  {
    value: 'BZ',
    content: 'BZ +501',
  },
  {
    value: 'CA',
    content: 'CA +1',
  },
  {
    value: 'CC',
    content: 'CC +61',
  },
  {
    value: 'CD',
    content: 'CD +243',
  },
  {
    value: 'CF',
    content: 'CF +236',
  },
  {
    value: 'CG',
    content: 'CG +242',
  },
  {
    value: 'CH',
    content: 'CH +41',
  },
  {
    value: 'CI',
    content: 'CI +225',
  },
  {
    value: 'CK',
    content: 'CK +682',
  },
  {
    value: 'CL',
    content: 'CL +56',
  },
  {
    value: 'CM',
    content: 'CM +237',
  },
  {
    value: 'CN',
    content: 'CN +86',
  },
  {
    value: 'CO',
    content: 'CO +57',
  },
  {
    value: 'CR',
    content: 'CR +506',
  },
  {
    value: 'CU',
    content: 'CU +53',
  },
  {
    value: 'CV',
    content: 'CV +238',
  },
  {
    value: 'CW',
    content: 'CW +599',
  },
  {
    value: 'CX',
    content: 'CX +61',
  },
  {
    value: 'CY',
    content: 'CY +357',
  },
  {
    value: 'CZ',
    content: 'CZ +420',
  },
  {
    value: 'DE',
    content: 'DE +49',
  },
  {
    value: 'DJ',
    content: 'DJ +253',
  },
  {
    value: 'DK',
    content: 'DK +45',
  },
  {
    value: 'DM',
    content: 'DM +1',
  },
  {
    value: 'DO',
    content: 'DO +1',
  },
  {
    value: 'DZ',
    content: 'DZ +213',
  },
  {
    value: 'EC',
    content: 'EC +593',
  },
  {
    value: 'EE',
    content: 'EE +372',
  },
  {
    value: 'EG',
    content: 'EG +20',
  },
  {
    value: 'EH',
    content: 'EH +212',
  },
  {
    value: 'ER',
    content: 'ER +291',
  },
  {
    value: 'ES',
    content: 'ES +34',
  },
  {
    value: 'ET',
    content: 'ET +251',
  },
  {
    value: 'FI',
    content: 'FI +358',
  },
  {
    value: 'FJ',
    content: 'FJ +679',
  },
  {
    value: 'FK',
    content: 'FK +500',
  },
  {
    value: 'FM',
    content: 'FM +691',
  },
  {
    value: 'FO',
    content: 'FO +298',
  },
  {
    value: 'FR',
    content: 'FR +33',
  },
  {
    value: 'GA',
    content: 'GA +241',
  },
  {
    value: 'GB',
    content: 'GB +44',
  },
  {
    value: 'GD',
    content: 'GD +1',
  },
  {
    value: 'GE',
    content: 'GE +995',
  },
  {
    value: 'GF',
    content: 'GF +594',
  },
  {
    value: 'GG',
    content: 'GG +44',
  },
  {
    value: 'GH',
    content: 'GH +233',
  },
  {
    value: 'GI',
    content: 'GI +350',
  },
  {
    value: 'GL',
    content: 'GL +299',
  },
  {
    value: 'GM',
    content: 'GM +220',
  },
  {
    value: 'GN',
    content: 'GN +224',
  },
  {
    value: 'GP',
    content: 'GP +590',
  },
  {
    value: 'GQ',
    content: 'GQ +240',
  },
  {
    value: 'GR',
    content: 'GR +30',
  },
  {
    value: 'GT',
    content: 'GT +502',
  },
  {
    value: 'GU',
    content: 'GU +1',
  },
  {
    value: 'GW',
    content: 'GW +245',
  },
  {
    value: 'GY',
    content: 'GY +592',
  },
  {
    value: 'HK',
    content: 'HK +852',
  },
  {
    value: 'HN',
    content: 'HN +504',
  },
  {
    value: 'HR',
    content: 'HR +385',
  },
  {
    value: 'HT',
    content: 'HT +509',
  },
  {
    value: 'HU',
    content: 'HU +36',
  },
  {
    value: 'ID',
    content: 'ID +62',
  },
  {
    value: 'IE',
    content: 'IE +353',
  },
  {
    value: 'IL',
    content: 'IL +972',
  },
  {
    value: 'IM',
    content: 'IM +833',
  },
  {
    value: 'IN',
    content: 'IN +91',
  },
  {
    value: 'IO',
    content: 'IO +246',
  },
  {
    value: 'IQ',
    content: 'IQ +964',
  },
  {
    value: 'IR',
    content: 'IR +98',
  },
  {
    value: 'IS',
    content: 'IS +354',
  },
  {
    value: 'IT',
    content: 'IT +39',
  },
  {
    value: 'JE',
    content: 'JE +44-1534',
  },
  {
    value: 'JM',
    content: 'JM +1',
  },
  {
    value: 'JO',
    content: 'JO +962',
  },
  {
    value: 'JP',
    content: 'JP +81',
  },
  {
    value: 'KE',
    content: 'KE +254',
  },
  {
    value: 'KG',
    content: 'KG +996',
  },
  {
    value: 'KH',
    content: 'KH +855',
  },
  {
    value: 'KI',
    content: 'KI +686',
  },
  {
    value: 'KM',
    content: 'KM +269',
  },
  {
    value: 'KN',
    content: 'KN +1',
  },
  {
    value: 'KP',
    content: 'KP +850',
  },
  {
    value: 'KR',
    content: 'KR +82',
  },
  {
    value: 'KW',
    content: 'KW +965',
  },
  {
    value: 'KY',
    content: 'KY +1',
  },
  {
    value: 'KZ',
    content: 'KZ +7',
  },
  {
    value: 'LA',
    content: 'LA +856',
  },
  {
    value: 'LB',
    content: 'LB +961',
  },
  {
    value: 'LC',
    content: 'LC +1',
  },
  {
    value: 'LI',
    content: 'LI +423',
  },
  {
    value: 'LK',
    content: 'LK +94',
  },
  {
    value: 'LR',
    content: 'LR +231',
  },
  {
    value: 'LS',
    content: 'LS +266',
  },
  {
    value: 'LT',
    content: 'LT +370',
  },
  {
    value: 'LU',
    content: 'LU +352',
  },
  {
    value: 'LV',
    content: 'LV +371',
  },
  {
    value: 'LY',
    content: 'LY +218',
  },
  {
    value: 'MA',
    content: 'MA +212',
  },
  {
    value: 'MC',
    content: 'MC +377',
  },
  {
    value: 'MD',
    content: 'MD +373',
  },
  {
    value: 'ME',
    content: 'ME +382',
  },
  {
    value: 'MF',
    content: 'MF +590',
  },
  {
    value: 'MG',
    content: 'MG +261',
  },
  {
    value: 'MH',
    content: 'MH +692',
  },
  {
    value: 'MK',
    content: 'MK +389',
  },
  {
    value: 'ML',
    content: 'ML +223',
  },
  {
    value: 'MM',
    content: 'MM +95',
  },
  {
    value: 'MN',
    content: 'MN +976',
  },
  {
    value: 'MO',
    content: 'MO +853',
  },
  {
    value: 'MP',
    content: 'MP +1',
  },
  {
    value: 'MQ',
    content: 'MQ +596',
  },
  {
    value: 'MR',
    content: 'MR +222',
  },
  {
    value: 'MS',
    content: 'MS +1',
  },
  {
    value: 'MT',
    content: 'MT +356',
  },
  {
    value: 'MU',
    content: 'MU +230',
  },
  {
    value: 'MV',
    content: 'MV +960',
  },
  {
    value: 'MW',
    content: 'MW +265',
  },
  {
    value: 'MX',
    content: 'MX +52',
  },
  {
    value: 'MY',
    content: 'MY +60',
  },
  {
    value: 'MZ',
    content: 'MZ +258',
  },
  {
    value: 'NA',
    content: 'NA +264',
  },
  {
    value: 'NC',
    content: 'NC +687',
  },
  {
    value: 'NE',
    content: 'NE +227',
  },
  {
    value: 'NF',
    content: 'NF +672',
  },
  {
    value: 'NG',
    content: 'NG +234',
  },
  {
    value: 'NI',
    content: 'NI +505',
  },
  {
    value: 'NL',
    content: 'NL +31',
  },
  {
    value: 'NO',
    content: 'NO +47',
  },
  {
    value: 'NP',
    content: 'NP +977',
  },
  {
    value: 'NR',
    content: 'NR +674',
  },
  {
    value: 'NU',
    content: 'NU +683',
  },
  {
    value: 'NZ',
    content: 'NZ +64',
  },
  {
    value: 'OM',
    content: 'OM +968',
  },
  {
    value: 'PA',
    content: 'PA +507',
  },
  {
    value: 'PE',
    content: 'PE +51',
  },
  {
    value: 'PF',
    content: 'PF +689',
  },
  {
    value: 'PG',
    content: 'PG +675',
  },
  {
    value: 'PH',
    content: 'PH +63',
  },
  {
    value: 'PK',
    content: 'PK +92',
  },
  {
    value: 'PL',
    content: 'PL +48',
  },
  {
    value: 'PM',
    content: 'PM +508',
  },
  {
    value: 'PR',
    content: 'PR +1',
  },
  {
    value: 'PS',
    content: 'PS 970',
  },
  {
    value: 'PT',
    content: 'PT +351',
  },
  {
    value: 'PW',
    content: 'PW +680',
  },
  {
    value: 'PY',
    content: 'PY +595',
  },
  {
    value: 'QA',
    content: 'QA +974',
  },
  {
    value: 'RE',
    content: 'RE +262',
  },
  {
    value: 'RO',
    content: 'RO +40',
  },
  {
    value: 'RS',
    content: 'RS +381',
  },
  {
    value: 'RU',
    content: 'RU +7',
  },
  {
    value: 'RW',
    content: 'RW +250',
  },
  {
    value: 'SA',
    content: 'SA +966',
  },
  {
    value: 'SB',
    content: 'SB +677',
  },
  {
    value: 'SC',
    content: 'SC +248',
  },
  {
    value: 'SD',
    content: 'SD +249',
  },
  {
    value: 'SE',
    content: 'SE +46',
  },
  {
    value: 'SG',
    content: 'SG +65',
  },
  {
    value: 'SH',
    content: 'SH +290',
  },
  {
    value: 'SI',
    content: 'SI +386',
  },
  {
    value: 'SJ',
    content: 'SJ +47',
  },
  {
    value: 'SK',
    content: 'SK +421',
  },
  {
    value: 'SL',
    content: 'SL +232',
  },
  {
    value: 'SM',
    content: 'SM +378',
  },
  {
    value: 'SN',
    content: 'SN +221',
  },
  {
    value: 'SO',
    content: 'SO +252',
  },
  {
    value: 'SR',
    content: 'SR +597',
  },
  {
    value: 'SS',
    content: 'SS +211',
  },
  {
    value: 'ST',
    content: 'ST +239',
  },
  {
    value: 'SV',
    content: 'SV +503',
  },
  {
    value: 'SX',
    content: 'SX +599',
  },
  {
    value: 'SY',
    content: 'SY +963',
  },
  {
    value: 'SZ',
    content: 'SZ +268',
  },
  {
    value: 'TC',
    content: 'TC +1',
  },
  {
    value: 'TD',
    content: 'TD +235',
  },
  {
    value: 'TG',
    content: 'TG +228',
  },
  {
    value: 'TH',
    content: 'TH +66',
  },
  {
    value: 'TJ',
    content: 'TJ +992',
  },
  {
    value: 'TK',
    content: 'TK +690',
  },
  {
    value: 'TL',
    content: 'TL +670',
  },
  {
    value: 'TM',
    content: 'TM +993',
  },
  {
    value: 'TN',
    content: 'TN +216',
  },
  {
    value: 'TO',
    content: 'TO +676',
  },
  {
    value: 'TR',
    content: 'TR +90',
  },
  {
    value: 'TT',
    content: 'TT +1',
  },
  {
    value: 'TV',
    content: 'TV +688',
  },
  {
    value: 'TW',
    content: 'TW +886',
  },
  {
    value: 'TZ',
    content: 'TZ +255',
  },
  {
    value: 'UA',
    content: 'UA +380',
  },
  {
    value: 'UG',
    content: 'UG +256',
  },
  {
    value: 'US',
    content: 'US +1',
  },
  {
    value: 'UY',
    content: 'UY +598',
  },
  {
    value: 'UZ',
    content: 'UZ +998',
  },
  {
    value: 'VA',
    content: 'VA +379',
  },
  {
    value: 'VC',
    content: 'VC +1',
  },
  {
    value: 'VE',
    content: 'VE +58',
  },
  {
    value: 'VG',
    content: 'VG +1',
  },
  {
    value: 'VI',
    content: 'VI +1',
  },
  {
    value: 'VN',
    content: 'VN +84',
  },
  {
    value: 'VU',
    content: 'VU +678',
  },
  {
    value: 'WF',
    content: 'WF +681',
  },
  {
    value: 'WS',
    content: 'WS +685',
  },
  {
    value: 'XK',
    content: 'XK +383',
  },
  {
    value: 'YE',
    content: 'YE +967',
  },
  {
    value: 'YT',
    content: 'YT +269',
  },
  {
    value: 'ZA',
    content: 'ZA +27',
  },
  {
    value: 'ZM',
    content: 'ZM +260',
  },
  {
    value: 'ZW',
    content: 'ZW +263',
  },
];
