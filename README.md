# Vue-week4


## 原功能 ```已寫好 ```
- 登入
- 驗證登入頁面
- 取得產品資料
- 新增、編輯產品
- 刪除產品

 
 ----------------------------------

### 加入功能
- 分頁按鈕
  串接分頁產品api 
- 串接圖片api 
- 新增一個自訂欄位

### 拆分元件
- 分頁元件  
- 新增、編輯元件
- 產品刪除元件

#### 分頁元件
1. 先建立元件模板(三個) 分頁、新增編輯、刪除
    獨立js檔案，用export default匯出
    在產品匯入js ，用import 匯入，並在app-component下載入元件
2. 串接產品列表(分頁)
    將參數page代入 api路徑 (預設值 page = 1 第一頁)
    將res 分頁寫入data
3. 將外層用props 寫入內層
    在元件加入props (內層)，在元件標籤寫入props(前內後外 :pages ="page" )代入data資料
4. 跑 v-for 讓total頁數渲染到畫面，並 代入{{ page }}正確顯示頁數
5. 讓選擇的頁數 focus 高亮起來 及 前頁後頁加入判斷(disabled)
    第一個判斷 -  :class = "{ active : page == pages.current_page}  判斷當前頁面等於page 顯示高亮 (加入class active)
    第二個判斷 -  :class = "{ disable : !pages.has_next}  判斷有無前一頁，!表示為false，false加入禁止使用(加入class disabled)
6. 切換頁面取得資料
    將取得當前頁面資料代入參數(page)，用props 傳入元件
    用props (第一種寫法) - 寫入內層元件套用參數(getData(頁數))
    用emit  (第二種寫法) - 將參數(page)傳回外層 
        在內層建立名稱 "$emit('changePage'(事件名稱),page(參數)) @change-page="getData"
    切換前頁、後頁，代入參數為當前頁面+1 -1

注意:
  避免key值重覆，須給他獨一無二的key，如果遇到數值可以加上其他編號避免重覆