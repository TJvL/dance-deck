use crate::categories::data::{CategoryNode, CategoryRecord};
use std::collections::HashMap;

pub fn build_category_tree(categories: Vec<CategoryRecord>) -> CategoryNode {
    let mut parent_to_children_categories: HashMap<Option<i32>, Vec<CategoryRecord>> =
        HashMap::new();
    for category in categories {
        parent_to_children_categories
            .entry(category.parent_id)
            .or_default()
            .push(category);
    }

    let root_category = &parent_to_children_categories
        .get(&None)
        .expect("Root category not found")[0];

    build_node(root_category, &parent_to_children_categories)
}

fn build_node(
    category: &CategoryRecord,
    parent_to_children_categories: &HashMap<Option<i32>, Vec<CategoryRecord>>,
) -> CategoryNode {
    let child_categories = parent_to_children_categories
        .get(&Some(category.id))
        .map(|children| {
            children
                .iter()
                .map(|child| build_node(child, parent_to_children_categories))
                .collect::<Vec<_>>()
        })
        .unwrap_or_default();

    CategoryNode {
        id: category.id,
        name: category.name.clone(),
        child_categories,
    }
}
