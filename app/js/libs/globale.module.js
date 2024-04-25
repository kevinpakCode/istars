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

/*
-------------------------------
* Accordion
-------------------------------
*/
const Accordion = (opt={}) => {
  const section = opt.section??document.body
  const allAccordion = opt.targetAccordion?? section.querySelectorAll('[data-accordion="true"]')
  if(allAccordion) {
    InjectStyles({
      name:'Accordion',
      styles: `
      .cpn-accordion {}
      .ui-pagination__table tbody tr td.cpn-accordion__item {  padding: 0;}
      .cpn-accordion__item-label {background-color:#60a3d9b5; border-bottom: solid 1px #0A0A0A; height:65px; line-height:55px; padding: 8px 80px 8px 50px;  cursor: pointer;}
      .ui-pagination__table tbody tr td.cpn-accordion__item .cpn-accordion__item-label {  /* padding: 16px 60px 16px 18px; */}
      .cpn-accordion__item-label--active::before {transform: rotate(180deg);}
      .cpn-accordion__item-label::before {content: "";  position: absolute;  width: 16px;  height: 16px;  background-color: #000;  -webkit-mask-image: url('./../../assets/images/svg/icon-arrow-bottom.svg');  -webkit-mask-size: 16px 16px;  -webkit-mask-repeat: no-repeat ;  -webkit-mask-position: center;  right: 8px;  top: calc(50% - 8px);  transition: transform .3s linear;}
      .cpn-accordion__item-content {padding: 0 10px;background-color:#f7fdff;max-height: 0; min-height:0;transition: all .3s linear;margin: 0;overflow: auto;}
      .cpn-accordion__item-content::-webkit-scrollbar {width: 6px;height: 6px;}
      .cpn-accordion__item-content::-webkit-scrollbar-thumb {width: 30%;height: 6px;background-color: #A8AAB1 !important;outline: none;border-radius: 6px;}
      .cpn-accordion__item-content::-webkit-scrollbar-track {background-color: transparent;}
      .cpn-accordion__item-content::-webkit-scrollbar-track-piece {width: 6px;background-color: #c6cada !important;border-radius: 5px;box-shadow: none;border: none;}
      .cpn-accordion__item-label--active {background-color: #60a3d9b5;}
      .cpn-accordion__item-label--active + dd.cpn-accordion__item-content {/*padding: 10px;*/max-height: 900px;min-height: 50px;border: solid 1px #d2d9dc;padding: 10px 10px;}
      .cpn-accordion__item-label--active + dd.cpn-accordion__item-content .cpn-wrap-table {max-height: 800px;}
      .cpn-accordion-head {display: flex;align-items: center;}
      .cpn-accordion-head__col {width: 33.33%;padding: 8px 10px;}
      .cpn-accordion-head__item-label {font-size: 0.8rem;line-height: 0.9rem;font-family: "Inter-Medium", sans-serif;color: #06407f;}
      .cpn-accordion-head__item-value {font-size: 0.7rem;line-height: 0.7rem;color: #050505;}
      .cpn-accordion-head__col-text {font-size: 0.75rem;line-height: 0.8rem;color: #050505;}
 
      .cpn-accordion__item-label--active .cpn-accordion-head__item-label {color: #ffffff;}
      .cpn-accordion__item-label--active .cpn-accordion-head__item-value {color: #cbc6c6;}
      .cpn-accordion__item-label--active .cpn-accordion-head__col-text {color: #c9f2ed;}
 
      .ui-pagination__table tbody .cpn-accordion__item-content tr:nth-child(even) {background-color: #f1f8fa;}
      `
    })
    const eventClick = e => {
      e.preventDefault
      const $this = e.target
      const elem = e.currentTarget
      elem.classList.toggle('cpn-accordion__item-label--active')
    }
    setTimeout(() => {
      console.log('allAccordion', allAccordion )
      allAccordion.forEach(accordion => {
        const allDt = accordion.querySelectorAll('dt')
        console.log('allDt', allDt )
        if(allDt) {
          allDt.forEach(item => {
            item.addEventListener('click', eventClick)
          })
        }
      })
    }, 200)
  }
 }
 