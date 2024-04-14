/**
 * //==> CURRENT URL
 */
const baseUrl = window.location.protocol + '//' +window.location.host+'/'

/*
-------------------------------
* APPEND STYLE IN DOCUMENT
-------------------------------
*/
const InjectStyles = (opt={}) => {
  const styles = opt.styles??''
  const name = opt.name??null
 
  if(styles&&name){
    //===>Default css
    const STYLE = styles.replace(/\n/g, '').replace(/\s{2,10}\./g, '.').replace(/:\s{1,10}/g, ':')
    const existStyleBlock = document.querySelector('style[data-modules]')
    const widgetName = name
    if(existStyleBlock) {
      const listWidgets = existStyleBlock.getAttribute('data-modules').split(' ')
      if(listWidgets.indexOf(widgetName)===-1) {
        existStyleBlock.insertAdjacentText('beforeend', STYLE)
        listWidgets.push(widgetName)
        existStyleBlock.setAttribute('data-modules', listWidgets.join(' '))
      }
      
    } else {
      const style = document.createElement('style')
      style.setAttribute('data-modules', widgetName)
      style.innerHTML = STYLE
      document.head.appendChild(style)
    }
  }
  
 }

 
/*
-------------------------------
* TABS
-------------------------------
*/
const ControlTabs = (opt={}) => {
  const selector = opt.selector??document.body
  const allTabs = selector.querySelectorAll('[data-tabs]')
  if(allTabs) {
    InjectStyles({
      name:'tabs',
      styles: `
        [data-tabs-box-name] {
          display:none
        }
        [data-tabs-box-name].selected {
          display:block
        }
      `
    })
 
    allTabs.forEach(item => {
      const allNavElem = item.querySelectorAll('[data-tabs-target]')
      const allContentElem = Array.from(item.querySelectorAll('[data-tabs-box-name]'))
      if(allNavElem&&allContentElem) {
        allNavElem.forEach(btn => {
          btn.addEventListener('click', e => {
            e.preventDefault
            allNavElem.forEach(_item => _item.classList.remove('selected'))
            btn.classList.add('selected')
            const _selector = btn.dataset.tabsTarget
            allContentElem.forEach(_item => _item.classList.remove('selected'))
            const selectedBlock = allContentElem.find(_item => _item?.dataset?.tabsBoxName===_selector)??null
            if(selectedBlock) {
              selectedBlock.classList.add('selected')
            }
          })
        })
      }
    })
  }

    // $('body').on('click', '[data-tabs-nav-item]', function(e) {
    //   e.preventDefault()
    //   const btn = $(this)
    //   const itemTarget = btn.data('tabs-nav-item')
  
    //   if(itemTarget) {
    //     btn.addClass('active').siblings('[data-tabs-nav-item]').removeClass('active')
    //     $('body').find(`#${itemTarget}`).addClass('active').siblings('[data-tabs-body]').removeClass('active')
    //   }
    // })
}



/*
----------------------------------------------------
* Loading Process
----------------------------------------------------
*/
const loadingProcess = (opt={}) => {
  const selectors = opt.selectors??null
  const targetId = opt.id??null
  const colSpan = opt.colSpan??null
  const loadIconPath = `${baseUrl}images/loading/icon-loading.svg`
  const size = opt.size??50
  //console.log(selectors)
  if(selectors&&Array.isArray(selectors)) {
    for (let i = 0; i < selectors.length; i++) {
      const selector = selectors[i]
      const item = document.querySelector(selector)
      if(item) {
        //item.classList.add('cpn-loading-proccess')
        item.insertAdjacentHTML('beforeend', 
        `
          <div class="cpn-loading cpn-loading-proccess" data-name="loading">
            <img src="${loadIconPath}" class="cpn-loading__img" alt="loading-img"  style="width:${size}px"> 
          </div>`
        )
      }
    }
  } else 
  if(targetId) {
    const block = document.getElementById(targetId)
    if(block) {
      const content = colSpan? `
        <tr>
          <td colspan="${colSpan}">
            <div class="cpn-loading" data-name="loading"><img src="${loadIconPath}" class="cpn-loading__img" alt="loading-img" style="width:${size}px"> Loading...</div>
          </td>
        </tr>
      `: `
      <div class="cpn-loading" data-name="loading"><img src="${loadIconPath}" class="cpn-loading__img" alt="loading-img"  style="width:${size}px"> Loading...</div>
      `
      block.innerHTML = content

      // setTimeout(() => {
      //   const notLoadingPage = block.querySelector('[data-name="loading"]')
      //   if(notLoadingPage) {
      //     const replaceMsg = EmptyDataAlert({
      //       targetBlock: notLoadingPage,
      //       message: "La page prend du temps à se charger, veuillez actualiser ou patientent encors un moment.",
      //       type: 'warning'

      //     })
      //     notLoadingPage.parentNode.replaceChild(replaceMsg, notLoadingPage)
      //   }
      // }, 35000);
    }
  }

}

