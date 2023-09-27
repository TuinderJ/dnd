main()

async function main() {
  if (!actor) {
    ui.notifications.error("Please select a token")
    return
  }

  const maxHP = actor.data.data.attributes.hp.max
  let currentHP = actor.data.data.attributes.hp.value
  const healingValue = 10

  let potionOfHealingItem = actor.items.find(item => item.name == "Potion of Healing")

  console.log(potionOfHealingItem.data.data.quantity)

  if (!potionOfHealingItem || potionOfHealingItem.data.data.quantity < 1) {
    ui.notifications.error(`${actor.data.name} doesn't have a healing potion`)
    return
  }
  console.log(currentHP)
  if (currentHP >= maxHP) {
    ui.notifications.warn("You have full HP")
    return
  }

  if (currentHP + healingValue >= maxHP) {
    actor.update({"data.hp.value": maxHP})
  } else {
    actor.update({"data.hp.value": currentHP += healingValue})
  }

  potionOfHealingItem.update({"data.quantity": potionOfHealingItem.data.data.quantity})
  actor.update()
}