const imageUrl = 'https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/';

const brandURL = '/mobiles';
const specificationURL = '/mobiles/specification';
const newsURL = '/mobiles/news';

const brandPageLimit = 30;
const newsPageLimit =30;

const brandList =[
    'Apple',
    'Asus',
    'Celkon',
    'Google',
    'Iball',
    'Honor',
    'Intex',
    'karbonn',
    'Lava',
    'LG',
    'Yu',
    'Xolo',
    'Xiaomi',
    'Vivo',
    'OnePlus',
    'OPPO',
    'Poco',
    'Realme',
    'Reliance',
    'Samsung',
    'Spice',
    'Swipe',
    'Micromax',
    'Motorola'
];

const brandImages ={
    Apple: `${imageUrl}Apple_logo_1644296725.png`,
    Asus: `${imageUrl}Asus_logo_1644296760.png`,
    Celkon: `${imageUrl}celkon_logo_1644296781.png`,
    Google: `${imageUrl}Google_logo_1644296803.png`,
    Iball: `${imageUrl}iball_logo_1644296845.png`,
    Honor: `${imageUrl}honor_logo_1644296824.png`,
    Intex: `${imageUrl}intex_logo_1644296861.png`,
    karbonn: `${imageUrl}karbonn_logo_1644296884.png`,
    Lava: `${imageUrl}lava_logo_1644296907.png`,
    LG: `${imageUrl}Lg_logo_1644296926.png`,
    Yu: `${imageUrl}yu_logo_1644297329.png`,
    Xolo: `${imageUrl}xolo_logo_1644297308.png`,
    Xiaomi: `${imageUrl}xiaomi_logo_1644297288.png`,
    Vivo: `${imageUrl}vivo_logo_1644297263.png`,
    Nokia: `${imageUrl}Nokia_logo_1644296985.png`,
    OnePlus: `${imageUrl}oneplus_logo_1644297010.png`,
    OPPO: `${imageUrl}oppo_logo_1644297043.png`,
    Poco: `${imageUrl}poco_logo_1644297065.png`,
    Realme: `${imageUrl}realme_logo_1644297087.png`,
    Reliance: `${imageUrl}reliance_logo_1644297128.png`,
    Samsung: `${imageUrl}Samsung_logo_1644297187.png`,
    Spice: `${imageUrl}spice_logo_1644297207.png`,
    Swipe: `${imageUrl}swipe_logo_1644297232.png`,
    Micromax: `${imageUrl}micromax_logo_1644296945.png`,
    Motorola: `${imageUrl}motorola_logo_1644296966.png`,
 };

const brandInHindi = {
    'apple': 'ऐपल',
    'asus': "आसुस",
    'celkon': "सेल्कॉन",
    'google': "गूगल",
    'iball': "आईबॉल",
    'honor': "ऑनर",
    'intex': "इंटेक्स",
    'karbonn': "कार्बन",
    'lava': "लावा",
    'lG': "एलजी",
    'yu': "",
    'xolo': "ज़ोलो",
    'xiaomi': "शियोमी",
    'vivo': "वीवो",
    'oneplus': "वनप्लस",
    'oppo': "ओप्पो",
    'poco': "पोको",
    'realme': "रियलमी",
    'reliance': "रिलायंस",
    'samsung': "सैमसंग",
    'spice': "स्पाइस",
    'swipe': "स्वाइप",
    'micromax': "माइक्रोमैक्स",
    'motorola': "मोटोरोला",
    'nokia': 'नोकिया'
};

 module.exports = { brandList, brandImages, specificationURL, brandURL, newsURL, brandPageLimit, newsPageLimit, brandInHindi };
