export interface IWord {
  hebrew: string;
  english: string;
  ukraine: string;
}
export enum languageEnum {
  hebrew= 'hebrew',
  ukraine= 'ukraine',
  english= 'english'
}
export interface ITranslate {
  LOGIN: IWord;
  LOGOUT: IWord;
  HELLO: IWord;
  LOGIN_AS: IWord;
  MENU: IWord;
  NEXT_TRAVELS: IWord;
  SHOW_PASSENGER_NAME: IWord;
  PRIVATE_ARCHIVE: IWord;
  SADIR_ARCHIVE: IWord;
  DICTIONARY: IWord;
  TODAY_TRAVELS: IWord;
  FUTURE_TRAVELS: IWord;
  DATE: IWord;
  PRICE: IWord;
  TIME: IWord;
  ORBIT: IWord;
  COST: IWord;
  CAR: IWord;
  CHARGE: IWord;
  SAVE: IWord;
  EDIT: IWord;
  NAME: IWord;



}
export const translate =  {

 LOGIN : {
   hebrew: 'כניסה למערכת'
   , english: 'Login'
   , ukraine: 'Вход в систему'
 } as IWord,
 LOGOUT : {
   hebrew: 'יציאה מהמערכת'
   , english: 'Logout'
   , ukraine: 'вийти'
 } as IWord,
 HELLO : {
   hebrew: 'שלום'
   , english: 'Hello'
   , ukraine: 'Привет'
 } as IWord,
 LOGIN_AS : {
   hebrew: 'מחובר כ '
   , english: 'Login as'
   , ukraine: 'Подключен как'
 } as IWord,
 MENU : {
   hebrew: 'תפריט ניווט'
   , english: 'Menu'
   , ukraine: 'Меню навигации'
 } as IWord,
 INVITE_TRAVEL : {
   hebrew: 'הזמנת נסיעה'
   , english: 'Invite new Travel'
   , ukraine: 'ПРИГЛАСИТЬ ПУТЕШЕСТВИЯ'
 } as IWord,
 NEXT_TRAVELS : {
   hebrew: 'הנסיעות הבאות'
   , english: 'Next Travels'
   , ukraine: 'Следующие путешествия'
 } as IWord,
 SHOW_PASSENGER_NAME : {
   hebrew: 'הראה את שם הנוסע בעברית'
   , english: 'Show the passenger name in Hebrew'
   , ukraine: 'Покажите мне имя пассажира на иврите'
 } as IWord,
 PRIVATE_ARCHIVE : {
   hebrew: 'ארכיון נסיעות פרטיות'
   , english: 'Archive Private Travels'
   , ukraine: 'Архив Регулярных Путешествий'
 } as IWord,
 SADIR_ARCHIVE : {
   hebrew: 'ארכיון נסיעות סדירות'
   , english: 'Archive Regular Travels'
   , ukraine: 'Регулярное путешествие'
 } as IWord,
 DICTIONARY : {
   hebrew: 'מילון'
   , english: 'Dictionary'
   , ukraine: 'словарь'
 } as IWord,
 TODAY_TRAVELS : {
   hebrew: 'נסיעות להיום'
   , english: 'Today Travels'
   , ukraine: 'Путешествие на сегодня'
 } as IWord,
 FUTURE_TRAVELS : {
   hebrew: 'נסיעות עתידיות'
   , english: 'Future Travels'
   , ukraine: 'Будущие путешествия'
 } as IWord,
 DATE : {
   hebrew: 'תאריך'
   , english: 'Date'
   , ukraine: 'дата'
 } as IWord,
 TIME : {
   hebrew: 'שעה'
   , english: 'Time'
   , ukraine: 'время'
 } as IWord,
 PRICE : {
   hebrew: 'מחיר'
   , english: 'Price'
   , ukraine: 'цена'
 } as IWord,
 ORBIT : {
   hebrew: 'מסלול'
   , english: 'Orbit'
   , ukraine: 'маршрут'
 } as IWord,
 CAR : {
   hebrew: 'רכב'
   , english: 'Car'
   , ukraine: 'автомобиль'
 } as IWord,
 COST : {
   hebrew: 'עלות'
   , english: 'Cost'
   , ukraine: 'стоимость'
 } as IWord,
 CHARGE : {
   hebrew: 'נגבה מהלקוח'
   , english: 'Charge'
   , ukraine: 'Сумма, полученная от клиента'
 } as IWord,
 SAVE : {
   hebrew: 'שמור'
   , english: 'Save'
   , ukraine: 'Сохранить'
 } as IWord,
 EDIT : {
   hebrew: 'ערוך'
   , english: 'Edit'
   , ukraine: 'Редактировать'
 } as IWord,
 NAME : {
   hebrew: 'שם'
   , english: 'Name'
   , ukraine: 'Имя'
 } as IWord,
 DRIVER_PART : {
   hebrew: 'רווח נהג'
   , english: 'Profit'
   , ukraine: 'Прибыль'
 } as IWord,
 AGENT_PART : {
   hebrew: 'רווח סוכן'
   , english: 'Profit'
   , ukraine: 'Прибыль'
 } as IWord,
 NOT_ALLOW_UPDATE_CAHRGE_MONEY : {
   hebrew: 'אינך יכול לעדכן טיול זה. התקשר לנחמן לעדכון.'
   , english: 'you can not update this travel - call to Nachman'
   , ukraine: 'Вы не можете обновить эту поездку.  Для обновления звоните Нахману.'
 } as IWord,



};


export type DictionaryKeys = keyof ITranslate; // "id" | "text" | "due"
