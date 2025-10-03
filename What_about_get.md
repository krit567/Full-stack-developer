# Day 1
? DOM ใน vue vue จะเป็นคนควบคุมเองหากมี DOM อื่นที่ vue ไม่ได้ควบคุม vue จะทำยังไงยกตัวอย่าง code dom ที่ vue ไม่ได้ควบคุม
// อันนี้ vue ไม่ได้เป็นคนควบคุม 
<div id="outside">This is outside Vue</div> เช่นแบบนี้ 

<script>
  // ส่วนนี้ Vue ไม่ได้ควบคุม ต้องใช้ JS ปกติ
  document.getElementById('outside').textContent = 'Changed by JS'
</script>

// อันนี้ vue จะควบคุม
<div id="app">
  {{ message }}
</div>
-- อะไรที่ vue ไม่ได้เป็นคนควบคุมจะต้องใช้ javascript ในการจัดการ dom เท่านั้นจะไม่สามารถใช้ฟิเจอร์ของ vue ได้

<script>
const Name = window.prompt("enter your name : ")
home.setName(Name)
`    state: () => ({
    message: "Hello welcome to my Home Page",
    description: "This is a description",
    loading: false,
    error: null,
    Name: null,
  }),
  getters: {
    krit(state) {
      return `${state.message} my name is krit`;
    },
  },
  actions: {
    setName(newName) {
      this.message = this.message + newName;
      return  `${this.message}`
    },
  },
});`

</script>

??ถ้าเรารับค่าตัวแปรจากหน้าเว็ปแล้วเอาตัวแปรไปใช่ใน store js ของเราค่านั้นจะเปลี่ยนเป็นค่าเดียวกันหมดเช่นถ้าเราเปลี่ยนค่า message ที่ actions ค่า message ที่ getters ของเราก็จะเปลี่ยนตามไปด้วยใช่มั้ย
??

== ถ้าเราเปลี่ยนค่าใน state (เช่น message) ผ่าน actions ค่าใน getters ที่อ้างอิง state นั้นก็จะเปลี่ยนตามทันที
เพราะ getters จะคำนวณค่าจาก state ทุกครั้งที่ state เปลี่ยน (reactive)
ดังนั้นถ้าเปลี่ยน message ใน actions ค่า message ใน getters ก็จะอัปเดตตามอัตโนมัติ
==