<template>
  <div>
    <div class="about-header">
      <div class="header-title">Künye</div>
    </div>
    <div class="about-body" style="padding: 0 158px">
      <div v-for="(user, index) in users" :key="index" :style="index > 0 ? 'margin-top: 62px' : null">
        <div style="display: flex">
          <div style="position: relative">
            <div class="profile-background" :style="`background-color: transparent`"></div>
            <img :src="user.avatarUrl" class="avatar" />
          </div>
          <div style="margin-left: 40px">
            <div style="display: flex">
              <div class="name">{{ user.name }}</div>
              <div class="bar" style="margin-left: 5px" />
              <div class="title" style="margin-left: 5px; align-self: center">{{ user.title }}</div>
            </div>
            <div style="margin-top: 10px; display: flex">
              <div v-for="(link, lIndex) in user.socialLinks" :key="lIndex" :style="index > 0 ? 'margin-left: 10px' : null" style="cursor: pointer">
                <a :href="link.url" target="_blank">
                  <img v-if="link.type === 'twitter'" src="../assets/icons/twitter.svg" style="width: 2vw; height: 2vw" />
                  <img v-if="link.type === 'dribble'" src="../assets/icons/dribbble.svg" style="width: 2vw; height: 2vw" />
                  <img v-if="link.type === 'instagram'" src="../assets/icons/instagram.svg" style="width: 2vw; height: 2vw" />
                  <img v-if="link.type === 'behance'" src="../assets/icons/behance.svg" style="width: 2vw; height: 2vw" />
                  <img v-if="link.type === 'linkedin'" src="../assets/icons/linkedin.svg" style="width: 2vw; height: 2vw" />
                </a>
              </div>
            </div>
            <div class="description" style="margin-top: 20px">{{ user.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  asyncData({ error, params, app, store }) {
    return app.$axios
      .get(`/api/credits`)
      .then(({ data }) => {
        if (!data) {
          return error({ statusCode: 404 })
        }
        return {
          users: data.credits,
        }
      })
      .catch((err) => {
        return error({ statusCode: 404, message: err })
      })
  },
  data() {
    return {
      users: [],
      colors: ['#80fffc', '#aa80ff', '#ffef80', '#ffef80', '#ffef80', '#ff80d4'],
    }
  },
}
</script>

<style lang="scss" scoped>
.about-header {
  background-image: url('../assets/images/rectangle-about.png');
  background-repeat: no-repeat;
  background-size: 100% 200px;
  height: 298px;
  object-fit: contain;
}
.about-body {
  margin-bottom: 100px;
}
.title {
  font-size: 0.9em;
  font-weight: 600;
  color: #aa80ff;
}
.name {
  font-size: 1em;
  font-weight: 800;
  color: white;
}
.description {
  font-size: 0.9em;
  color: #878c97;
  font-weight: normal;
}

.bar {
  width: 2px;
  height: 1.2vw;
  border-radius: 1px;
  background-color: #80fffc;
}

.profile-background {
  width: 112px;
  height: 154px;
  object-fit: contain;
  border-radius: 12px;
}
.avatar {
  position: absolute;
  z-index: 2;
  top: 10px;
  left: -10px;
  width: 112px;
  border-radius: 12px;
}
.header-title {
  font-size: 24px;
  font-weight: 800;
  color: white;
  padding-top: 145px;
  padding-left: 180px;
}
</style>
