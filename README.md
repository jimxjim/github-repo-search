# github-repo-search

## Setup
```
npm install
npm start
```

## And
>開啟 [http://localhost:8080/](http://localhost:8080/ )
* * *
## 說明
```
components
```
這裡使用目前工作上熟悉的 Vuejs  
將畫面中的輸入欄與 repo-box 的分別製作元件  

```
views/Home.vue
```
使用 debounce 機制限制使用者發送 request 頻率  
(github 限制為每分鐘 10 次)  
監聽視窗滾動也使用同樣的機制  
計算視窗高度與容器高度、容器上端的距離來判斷是否滾動到底部

```
helpers/request.js
```
將 axios 與狀態管理 vuex 的 commit 包裝給 actions 使用  
在頁面裡取得 states 並做處理後使用