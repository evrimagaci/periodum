<template>
  <div class="slider-box-wrapper">
    <div class="flex flex-col items-center">
      <div class="slider-box solid">
        <img width="18" height="16" src="~/assets/icons/solid.svg" />
      </div>
      <div class="title">Katı</div>
    </div>
    <div class="flex flex-col items-center" style="margin-left: 30px">
      <div class="slider-box liquid">
        <img width="20" height="19" src="~/assets/icons/liquid.svg" />
      </div>
      <div class="title">Sıvı</div>
    </div>
    <div class="flex flex-col items-center" style="margin-left: 30px">
      <div class="slider-box gas">
        <img width="20" height="16" src="~/assets/icons/gas.svg" />
      </div>
      <div class="title">Gaz</div>
    </div>
    <div class="flex flex-col items-center" style="margin-left: 30px">
      <div class="slider-box unknown">
        <img width="13" height="20" src="~/assets/icons/undefined.svg" />
      </div>
      <div class="title">Belirsiz</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'States',
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';
.slider-box-wrapper {
  display: flex;
  margin-top: 23px;
  text-align: center;
  .slider-box {
    width: 2.3vw;
    height: 2.3vw;
    border-radius: 4px;
    display: flex;
    img {
      align-self: center;
      margin: auto;
    }
  }
  .solid {
    box-shadow: 0 2px 40px 0 #ffaf8066;
    background-image: linear-gradient(135deg, #ffaf80, #b84300);
  }
  .liquid {
    box-shadow: 0 2px 40px 0 #8095ff66;
    background-image: linear-gradient(135deg, #8095ff, #001fb8);
  }
  .gas {
    box-shadow: 0 2px 40px 0 #ffef8066;
    background-image: linear-gradient(135deg, #ffef80, #b89f00);
  }
  .unknown {
    box-shadow: 0 2px 40px 0 #d4dadc66;
    background-image: linear-gradient(135deg, #d4dadc, #536065);
  }
  .purple {
    box-shadow: 0 2px 40px 0 #b994fa66;
    background-image: linear-gradient(135deg, #d5b7ff, #aa80ff);
  }
  .blue {
    box-shadow: 0 2px 20px 0 #889eff66;
    background-image: linear-gradient(135deg, #acbdff, #8095ff);
  }
  .teal {
    box-shadow: 0 2px 20px 0 #99fffc66;
    background-image: linear-gradient(135deg, #80fffc, #56d9d7);
  }
  .orange {
    box-shadow: 0 2px 40px 0 #ffaf8066;
    background-image: linear-gradient(135deg, #ffaf80, #ed954b 100%);
  }
  .title {
    font-size: 14px;
    font-weight: 600;
    color: $gray;
    margin-top: 3px;
  }
}
</style>
