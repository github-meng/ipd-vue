<template>
  <a-row type="flex" style="flex-flow: row nowrap">
    <a-col flex="250px" class="ipd-account-left">
      <div class="account-left-box">
        <div class="account-head">
          <a-avatar
            class="account-avatar"
            :src="
              require(role == 'admin'
                ? '@/assets/admin.png'
                : '@/assets/user.png')
            "
            alt="头像"
          />
          <h4 class="account-h4">{{ username }}</h4>
          <p class="account-p">世界上所有的相遇都是久别重逢。</p>
        </div>
        <div class="account-body">
          <p class="mb-1">
            <a-icon type="idcard" class="mr-1" />
            前端交互工程师
          </p>
          <p class="mb-1">
            <a-icon type="cluster" class="mr-1" />
            腾讯－某某某事业群－某某平台部－某某技术部－IPD
          </p>
          <p class="mb-1">
            <a-icon type="home" class="mr-1" />
            广东省深圳市南山区
          </p>
          <div class="account-tag">
            <h4>标签</h4>
            <template v-for="(tag, index) in tags">
              <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                <a-tag
                  class="tag"
                  :key="tag"
                  :closable="index >= 3"
                  @close="() => handleClose(tag)"
                >
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag
                class="tag"
                v-else
                :key="tag"
                :closable="index >= 3"
                @close="() => handleClose(tag)"
              >
                {{ tag }}
              </a-tag>
            </template>
            <a-input
              v-if="inputVisible"
              ref="input"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              :value="inputValue"
              @change="handleInputChange"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
            />
            <a-tag
              v-else
              style="background: #fff; borderStyle: dashed;"
              @click="showInput"
            >
              <a-icon type="plus" /> Add
            </a-tag>
          </div>
        </div>
      </div>
    </a-col>
    <a-col flex="auto" class="ipd-account-right">
      <div class="account-right-box">
        <a-descriptions title="前端负责人">
          <a-descriptions-item label="名字">
            Zhou Maomao
          </a-descriptions-item>
          <a-descriptions-item label="电话">
            1810000000
          </a-descriptions-item>
          <a-descriptions-item label="办公室">
            Hangzhou, Zhejiang
          </a-descriptions-item>
          <a-descriptions-item label="标签">
            empty
          </a-descriptions-item>
          <a-descriptions-item label="住址">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions title="后端负责人">
          <a-descriptions-item label="名字">
            Zhou Maomao
          </a-descriptions-item>
          <a-descriptions-item label="电话">
            1810000000
          </a-descriptions-item>
          <a-descriptions-item label="办公室">
            Hangzhou, Zhejiang
          </a-descriptions-item>
          <a-descriptions-item label="标签">
            empty
          </a-descriptions-item>
          <a-descriptions-item label="住址">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </a-descriptions-item>
        </a-descriptions>
        <a-divider />
        <a-descriptions title="测试负责人">
          <a-descriptions-item label="名字">
            Zhou Maomao
          </a-descriptions-item>
          <a-descriptions-item label="电话">
            1810000000
          </a-descriptions-item>
          <a-descriptions-item label="办公室">
            Hangzhou, Zhejiang
          </a-descriptions-item>
          <a-descriptions-item label="标签">
            empty
          </a-descriptions-item>
          <a-descriptions-item label="住址">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.getters.getterUserName;
    },
    userimage() {
      return this.$store.getters.getterUserImage;
    },
    password() {
      return this.$store.getters.getterPassWord;
    },
    phone() {
      return this.$store.getters.getterUserPhone;
    },
    email() {
      return this.$store.getters.getterUserEmail;
    },
    role() {
      return this.$store.getters.getterUserRole;
    }
  },
  data() {
    return {
      tags: ["有想法", "有行动", "帅气", "能力"],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ""
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ipd-account-left,
.ipd-account-right {
  height: calc(100vh - 80px);
  background-color: #ffffff;
  border-radius: 2px;
  overflow: auto;
}
.ipd-account-right {
  margin-left: 16px;
}
.account-head {
  text-align: center;
  .account-avatar {
    width: 100px;
    height: 100px;
    border: 1px solid #999;
    margin: 16px auto;
  }
  .account-p {
    color: #999;
  }
  .account-h4 {
    font-size: 16px;
  }
}
.account-body {
  padding: 24px;
  .account-tag {
    margin-top: 2em;
    .tag {
      margin-bottom: 8px;
    }
  }
}
.account-right-box {
  padding: 24px;
  /deep/.ant-descriptions-row > th,
  /deep/.ant-descriptions-row > td {
    // white-space: nowrap;
    vertical-align: baseline;
  }
  /deep/.ant-descriptions-title {
    margin-bottom: 8px;
  }
}
</style>
